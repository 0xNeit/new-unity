import { QueryObserverOptions, useQuery } from 'react-query';

import getVTokenBalancesAll, {
  GetVTokenBalancesAllInput,
  GetVTokenBalancesAllOutput,
} from 'clients/api/queries/getVTokenBalancesAll';
import { useGetUniqueContract } from 'clients/contracts/hooks';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetVTokenBalancesAllOutput,
  Error,
  GetVTokenBalancesAllOutput,
  GetVTokenBalancesAllOutput,
  [FunctionKey.GET_V_TOKEN_BALANCES_ALL, Omit<GetVTokenBalancesAllInput, 'ucoreLensContract'>]
>;

const useGetVTokenBalancesAll = (
  { account, vTokenAddresses }: Omit<GetVTokenBalancesAllInput, 'ucoreLensContract'>,
  options?: Options,
) => {
  const ucoreLensContract = useGetUniqueContract({
    name: 'ucoreLens',
  });

  return useQuery(
    [FunctionKey.GET_V_TOKEN_BALANCES_ALL, { account, vTokenAddresses }],
    () => getVTokenBalancesAll({ ucoreLensContract, account, vTokenAddresses }),
    {
      refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
      ...options,
    },
  );
};

export default useGetVTokenBalancesAll;
