import BigNumber from 'bignumber.js';
import { checkForUaiVaultTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';

import { UaiVault } from 'types/contracts';

export interface WithdrawFromUaiVaultInput {
  uaiVaultContract: UaiVault;
  amountWei: BigNumber;
}

export type WithdrawFromUaiVaultOutput = ContractReceipt;

const withdrawFromUaiVault = async ({
  uaiVaultContract,
  amountWei,
}: WithdrawFromUaiVaultInput): Promise<WithdrawFromUaiVaultOutput> => {
  const transaction = await uaiVaultContract.withdraw(amountWei.toFixed());
  const receipt = await transaction.wait(1);
  return checkForUaiVaultTransactionError(receipt);
};

export default withdrawFromUaiVault;
