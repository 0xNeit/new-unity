import BigNumber from 'bignumber.js';
import { checkForUaiVaultTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';

import { UaiVault } from 'types/contracts';

export interface StakeInUaiVaultInput {
  uaiVaultContract: UaiVault;
  amountWei: BigNumber;
}

export type StakeInUaiVaultOutput = ContractReceipt;

const stakeInUaiVault = async ({
  uaiVaultContract,
  amountWei,
}: StakeInUaiVaultInput): Promise<StakeInUaiVaultOutput> => {
  const transaction = await uaiVaultContract.deposit(amountWei.toFixed());
  const receipt = await transaction.wait(1);
  return checkForUaiVaultTransactionError(receipt);
};

export default stakeInUaiVault;
