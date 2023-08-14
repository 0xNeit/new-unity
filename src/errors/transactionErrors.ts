import BigNumber from 'bignumber.js';
import { ContractReceipt } from 'ethers';

import {
  ComptrollerErrorReporterError,
  ComptrollerErrorReporterFailureInfo,
  TokenErrorReporterError,
  TokenErrorReporterFailureInfo,
  UaiControllerErrorReporterError,
  UaiControllerErrorReporterFailureInfo,
  UaiVaultErrorReporterError,
  UaiVaultErrorReporterInfo,
  UcoreVaultProxyErrorReporterError,
  UcoreVaultProxyErrorReporterInfo,
} from '../constants/contracts/errorReporter';

import { VError, VErrorPhraseMap } from './VError';

// Some contracts don't revert when failing but instead return a Failure event.
// These functions are used to detect such cases and throw an error when a
// Failure event is detected

const checkForTransactionError = (
  receipt: ContractReceipt,
  errorEnum:
    | typeof ComptrollerErrorReporterError
    | typeof TokenErrorReporterError
    | typeof UaiControllerErrorReporterError
    | typeof UaiVaultErrorReporterError
    | typeof UcoreVaultProxyErrorReporterError,
  infoEnum:
    | typeof ComptrollerErrorReporterFailureInfo
    | typeof TokenErrorReporterFailureInfo
    | typeof UaiControllerErrorReporterFailureInfo
    | typeof UaiVaultErrorReporterInfo
    | typeof UcoreVaultProxyErrorReporterInfo,
) => {
  const failureEvent = receipt.events?.find(event => event.event === 'Failure');

  if (failureEvent) {
    const errorIndex = failureEvent.args?.error
      ? // eslint-disable-next-line no-underscore-dangle
        new BigNumber(failureEvent.args.error._hex).toNumber()
      : 0;

    throw new VError({
      type: 'transaction',
      code: errorEnum[errorIndex] as VErrorPhraseMap['transaction'],
      data: {
        error: errorEnum[errorIndex] as VErrorPhraseMap['transaction'],
        info: infoEnum[errorIndex] as VErrorPhraseMap['transaction'],
      },
    });
  }
  return receipt;
};

export const checkForComptrollerTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    ComptrollerErrorReporterError,
    ComptrollerErrorReporterFailureInfo,
  );

export const checkForTokenTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(receipt, TokenErrorReporterError, TokenErrorReporterFailureInfo);

export const checkForUaiControllerTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    UaiControllerErrorReporterError,
    UaiControllerErrorReporterFailureInfo,
  );

export const checkForUaiVaultTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(receipt, UaiVaultErrorReporterError, UaiVaultErrorReporterInfo);

export const checkForUcoreVaultProxyTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    UcoreVaultProxyErrorReporterError,
    UcoreVaultProxyErrorReporterInfo,
  );
