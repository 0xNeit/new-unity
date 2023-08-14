import { checkForUcoreVaultProxyTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';

import { UcoreVault } from 'types/contracts';

export interface ExecuteWithdrawalFromUcoreVaultInput {
  ucoreVaultContract: UcoreVault;
  rewardTokenAddress: string;
  poolIndex: number;
}

export type ExecuteWithdrawalFromUcoreVaultOutput = ContractReceipt;

const executeWithdrawalFromUcoreVault = async ({
  ucoreVaultContract,
  rewardTokenAddress,
  poolIndex,
}: ExecuteWithdrawalFromUcoreVaultInput): Promise<ExecuteWithdrawalFromUcoreVaultOutput> => {
  const transaction = await ucoreVaultContract.executeWithdrawal(rewardTokenAddress, poolIndex);
  const receipt = await transaction.wait(1);
  return checkForUcoreVaultProxyTransactionError(receipt);
};

export default executeWithdrawalFromUcoreVault;
