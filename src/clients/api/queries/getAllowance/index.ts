import BigNumber from 'bignumber.js';

import { Bep20, UaiToken, UrtToken, UcoreToken } from 'types/contracts';

export interface GetAllowanceInput {
  tokenContract: UrtToken | UcoreToken | Bep20 | UaiToken;
  accountAddress: string;
  spenderAddress: string;
}

export type GetAllowanceOutput = {
  allowanceWei: BigNumber;
};

const getAllowance = async ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: GetAllowanceInput): Promise<GetAllowanceOutput> => {
  const res = await tokenContract.allowance(accountAddress, spenderAddress);

  return {
    allowanceWei: new BigNumber(res.toString()),
  };
};

export default getAllowance;
