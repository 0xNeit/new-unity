import { UseQueryOptions, UseQueryResult, useQueries } from 'react-query';
import { getContractAddress, getTokenByAddress } from 'utils';

import { GetBalanceOfOutput, getBalanceOf } from 'clients/api';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';
import { useAuth } from 'context/AuthContext';

const UCORE_VAULT_PROXY_CONTRACT_ADDRESS = getContractAddress('ucoreVaultProxy');

export interface UseGetUcoreVaultPoolBalancesInput {
  stakedTokenAddresses: (string | undefined)[];
}

export type UseGetUcoreVaultPoolBalancesOutput = UseQueryResult<GetBalanceOfOutput>[];

const useGetUcoreVaultPoolBalances = ({
  stakedTokenAddresses,
}: UseGetUcoreVaultPoolBalancesInput): UseGetUcoreVaultPoolBalancesOutput => {
  const { provider } = useAuth();

  // Fetch total amount of tokens staked in each pool
  const queries: UseQueryOptions<GetBalanceOfOutput>[] = stakedTokenAddresses.map(
    stakedTokenAddress => {
      const stakedToken = stakedTokenAddress ? getTokenByAddress(stakedTokenAddress) : undefined;

      return {
        queryFn: () =>
          getBalanceOf({
            provider,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            token: stakedToken!,
            accountAddress: UCORE_VAULT_PROXY_CONTRACT_ADDRESS,
          }),
        queryKey: [
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress: UCORE_VAULT_PROXY_CONTRACT_ADDRESS,
            tokenAddress: stakedToken?.address,
          },
        ],
        enabled: !!stakedToken,
        refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
      };
    },
  );

  return useQueries(queries);
};

export default useGetUcoreVaultPoolBalances;
