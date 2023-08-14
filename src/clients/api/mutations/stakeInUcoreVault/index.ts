import BigNumber from 'bignumber.js';
import { checkForUcoreVaultProxyTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';
import { Token } from 'types';

import { UcoreVault } from 'types/contracts';

export interface StakeInUcoreVaultInput {
  ucoreVaultContract: UcoreVault;
  rewardToken: Token;
  amountWei: BigNumber;
  poolIndex: number;
}

export type StakeInUcoreVaultOutput = ContractReceipt;

const stakeInUcoreVault = async ({
  ucoreVaultContract,
  rewardToken,
  amountWei,
  poolIndex,
}: StakeInUcoreVaultInput): Promise<StakeInUcoreVaultOutput> => {
  const transaction = await ucoreVaultContract.deposit(
    rewardToken.address,
    poolIndex,
    amountWei.toFixed(),
  );
  const receipt = await transaction.wait(1);
  return checkForUcoreVaultProxyTransactionError(receipt);
};

export default stakeInUcoreVault;
