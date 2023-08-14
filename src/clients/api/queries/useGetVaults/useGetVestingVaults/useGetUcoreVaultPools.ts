import { UseQueryOptions, UseQueryResult, useQueries } from 'react-query';

import {
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
  GetUcoreVaultPoolInfoOutput,
  GetUcoreVaultUserInfoOutput,
  getUcoreVaultPendingWithdrawalsFromBeforeUpgrade,
  getUcoreVaultPoolInfo,
  getUcoreVaultUserInfo,
} from 'clients/api';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

export interface UseGetUcoreVaultPoolsInput {
  poolsCount: number;
  accountAddress?: string;
}

export type UseGetUcoreVaultPoolsOutput = UseQueryResult<
  | GetUcoreVaultPoolInfoOutput
  | GetUcoreVaultUserInfoOutput
  | GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput
>[];

const useGetUcoreVaultPools = ({
  accountAddress,
  poolsCount,
}: UseGetUcoreVaultPoolsInput): UseGetUcoreVaultPoolsOutput => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  const poolQueries: UseQueryOptions<
    | GetUcoreVaultPoolInfoOutput
    | GetUcoreVaultUserInfoOutput
    | GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput
  >[] = [];

  // Fetch pool infos
  // TODO: use multicall
  for (let poolIndex = 0; poolIndex < poolsCount; poolIndex++) {
    poolQueries.push({
      queryFn: () =>
        getUcoreVaultPoolInfo({
          ucoreVaultContract,
          rewardTokenAddress: TOKENS.ucore.address,
          poolIndex,
        }),
      queryKey: [
        FunctionKey.GET_UCORE_VAULT_POOL_INFOS,
        { rewardTokenAddress: TOKENS.ucore.address, poolIndex },
      ],
    });

    poolQueries.push({
      queryFn: () =>
        getUcoreVaultUserInfo({
          ucoreVaultContract,
          rewardTokenAddress: TOKENS.ucore.address,
          poolIndex,
          accountAddress: accountAddress || '',
        }),
      queryKey: [
        FunctionKey.GET_UCORE_VAULT_USER_INFO,
        { accountAddress, rewardTokenAddress: TOKENS.ucore.address, poolIndex },
      ],
      enabled: !!accountAddress,
    });

    poolQueries.push({
      queryFn: () =>
        getUcoreVaultPendingWithdrawalsFromBeforeUpgrade({
          ucoreVaultContract,
          rewardTokenAddress: TOKENS.ucore.address,
          poolIndex,
          accountAddress: accountAddress || '',
        }),
      queryKey: [
        FunctionKey.GET_UCORE_VAULT_PENDING_WITHDRAWALS_FROM_BEFORE_UPGRADE,
        { accountAddress, rewardTokenAddress: TOKENS.ucore.address, poolIndex },
      ],
      enabled: !!accountAddress,
    });
  }

  return useQueries(poolQueries);
};

export default useGetUcoreVaultPools;
