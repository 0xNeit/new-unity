import { UcoreLens } from 'types/contracts';

export interface GetVTokenBalancesAllInput {
  account: string;
  vTokenAddresses: string[];
  ucoreLensContract?: UcoreLens;
}

interface Balance {
  balanceOf: string;
  balanceOfUnderlying: string;
  borrowBalanceCurrent: string;
  tokenAllowance: string;
  tokenBalance: string;
  vToken: string;
}

export type GetVTokenBalancesAllOutput = {
  balances: Balance[];
};

const getVTokenBalancesAll = async ({
  ucoreLensContract,
  vTokenAddresses,
  account,
}: GetVTokenBalancesAllInput): Promise<GetVTokenBalancesAllOutput> => {
  const results = await ucoreLensContract?.callStatic.vTokenBalancesAll(
    vTokenAddresses,
    account?.toLowerCase(),
  );

  // This is original returned as an array with these properties but at some
  // point the properties are getting removed from the type
  const balances = (results || []).map(item => ({
    balanceOf: item.balanceOf.toString(),
    balanceOfUnderlying: item.balanceOfUnderlying.toString(),
    borrowBalanceCurrent: item.borrowBalanceCurrent.toString(),
    tokenAllowance: item.tokenAllowance.toString(),
    tokenBalance: item.tokenBalance.toString(),
    vToken: item.vToken,
  }));

  return { balances };
};

export default getVTokenBalancesAll;
