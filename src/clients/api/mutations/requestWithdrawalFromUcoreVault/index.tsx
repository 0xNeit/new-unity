import BigNumber from 'bignumber.js';
import { checkForUcoreVaultProxyTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';

import { UcoreVault } from 'types/contracts';

export interface RequestWithdrawalFromUcoreVaultInput {
  ucoreVaultContract: UcoreVault;
  rewardTokenAddress: string;
  poolIndex: number;
  amountWei: BigNumber;
}

export type RequestWithdrawalFromUcoreVaultOutput = ContractReceipt;

const requestWithdrawalFromUcoreVault = async ({
  ucoreVaultContract,
  rewardTokenAddress,
  poolIndex,
  amountWei,
}: RequestWithdrawalFromUcoreVaultInput): Promise<RequestWithdrawalFromUcoreVaultOutput> => {
  const transaction = await ucoreVaultContract.requestWithdrawal(
    rewardTokenAddress,
    poolIndex,
    amountWei.toFixed(),
  );
  const receipt = await transaction.wait(1);
  return checkForUcoreVaultProxyTransactionError(receipt);
};

export default requestWithdrawalFromUcoreVault;
