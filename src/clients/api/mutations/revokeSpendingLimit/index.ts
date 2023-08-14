import { ContractReceipt } from 'ethers';

import { Bep20, UaiToken, UrtToken, UcoreToken } from 'types/contracts';

export interface RevokeSpendingLimitInput {
  tokenContract: Bep20 | UaiToken | UrtToken | UcoreToken;
  spenderAddress: string;
}

export type RevokeSpendingLimitOutput = ContractReceipt;

const revokeSpendingLimit = async ({
  tokenContract,
  spenderAddress,
}: RevokeSpendingLimitInput): Promise<RevokeSpendingLimitOutput> => {
  const transaction = await tokenContract.approve(spenderAddress, 0);
  return transaction.wait(1);
};

export default revokeSpendingLimit;
