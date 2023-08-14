import { useMemo } from 'react';
import { UseQueryResult } from 'react-query';
import { Vault } from 'types';
import { getTokenByAddress, indexBy } from 'utils';

import {
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
  GetUcoreVaultPoolInfoOutput,
  GetUcoreVaultUserInfoOutput,
  useGetUcoreVaultPoolCount,
  useGetUcoreVaultRewardPerBlock,
  useGetUcoreVaultTotalAllocationPoints,
} from 'clients/api';
import { BLOCKS_PER_DAY } from 'constants/core';
import { DAYS_PER_YEAR } from 'constants/daysPerYear';
import { TOKENS } from 'constants/tokens';

import useGetUcoreVaultPoolBalances from './useGetUcoreVaultPoolBalances';
import useGetUcoreVaultPools from './useGetUcoreVaultPools';

export interface UseGetVestingVaultsOutput {
  isLoading: boolean;
  data: Vault[];
}

const useGetVestingVaults = ({
  accountAddress,
}: {
  accountAddress?: string;
}): UseGetVestingVaultsOutput => {
  const {
    data: ucoreVaultPoolCountData = { poolCount: 0 },
    isLoading: isGetUcoreVaultPoolCountLoading,
  } = useGetUcoreVaultPoolCount();

  // Fetch data generic to all UCORE pools
  const { data: ucoreVaultRewardWeiPerBlock, isLoading: isGetUcoreVaultRewardPerBlockLoading } =
    useGetUcoreVaultRewardPerBlock({
      tokenAddress: TOKENS.ucore.address,
    });

  const {
    data: ucoreVaultTotalAllocationPointsData,
    isLoading: isGetUcoreVaultTotalAllocationPointsLoading,
  } = useGetUcoreVaultTotalAllocationPoints({
    tokenAddress: TOKENS.ucore.address,
  });

  // Fetch pools
  const poolQueryResults = useGetUcoreVaultPools({
    accountAddress,
    poolsCount: ucoreVaultPoolCountData.poolCount,
  });
  const arePoolQueriesLoading = poolQueryResults.some(queryResult => queryResult.isLoading);

  // Index results by pool ID
  const [poolData, stakedTokenAddresses] = useMemo(() => {
    const data: {
      [poolIndex: string]: {
        poolInfos: GetUcoreVaultPoolInfoOutput;
        userInfos?: GetUcoreVaultUserInfoOutput;
        hasPendingWithdrawalsFromBeforeUpgrade: boolean;
      };
    } = {};

    const tokenAddresses: string[] = [];

    const queriesPerPoolCount =
      ucoreVaultPoolCountData.poolCount > 0
        ? poolQueryResults.length / ucoreVaultPoolCountData.poolCount
        : 0;

    for (let poolIndex = 0; poolIndex < ucoreVaultPoolCountData.poolCount; poolIndex++) {
      const poolQueryResultStartIndex = poolIndex * queriesPerPoolCount;

      const poolInfosQueryResult = poolQueryResults[
        poolQueryResultStartIndex
      ] as UseQueryResult<GetUcoreVaultPoolInfoOutput>;

      const userInfoQueryResult = poolQueryResults[
        poolQueryResultStartIndex + 1
      ] as UseQueryResult<GetUcoreVaultUserInfoOutput>;

      const userPendingWithdrawalsFromBeforeUpgradeQueryResult = poolQueryResults[
        poolQueryResultStartIndex + 2
      ] as UseQueryResult<GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput>;

      if (poolInfosQueryResult?.data) {
        tokenAddresses.push(poolInfosQueryResult.data.stakedTokenAddress);

        data[poolIndex] = {
          poolInfos: poolInfosQueryResult.data,
          userInfos: userInfoQueryResult.data,
          hasPendingWithdrawalsFromBeforeUpgrade:
            userPendingWithdrawalsFromBeforeUpgradeQueryResult.data?.pendingWithdrawalsFromBeforeUpgradeWei.isGreaterThan(
              0,
            ) || false,
        };
      }
    }

    return [data, tokenAddresses];
  }, [JSON.stringify(poolQueryResults), ucoreVaultPoolCountData.poolCount]);

  // Fetch pool balances
  const poolBalanceQueryResults = useGetUcoreVaultPoolBalances({
    stakedTokenAddresses,
  });
  const arePoolBalanceQueriesLoading = poolBalanceQueryResults.some(
    queryResult => queryResult.isLoading,
  );

  // Index results by pool ID
  const poolBalances = useMemo(
    () =>
      indexBy(
        (_item, index) => `${index}`,
        poolBalanceQueryResults.map(poolBalanceQueryResult => poolBalanceQueryResult.data),
      ),
    [JSON.stringify(poolBalanceQueryResults)],
  );

  const isLoading =
    isGetUcoreVaultPoolCountLoading ||
    isGetUcoreVaultRewardPerBlockLoading ||
    isGetUcoreVaultTotalAllocationPointsLoading ||
    arePoolQueriesLoading ||
    arePoolBalanceQueriesLoading;

  // Format query results into Vaults
  const data: Vault[] = useMemo(
    () =>
      Array.from({ length: ucoreVaultPoolCountData.poolCount }).reduce<Vault[]>(
        (acc, _item, poolIndex) => {
          const totalStakedWeiData = poolBalances[poolIndex];
          const lockingPeriodMs = poolData[poolIndex]?.poolInfos.lockingPeriodMs;
          const userStakedWei = poolData[poolIndex]?.userInfos?.stakedAmountWei;
          const hasPendingWithdrawalsFromBeforeUpgrade =
            poolData[poolIndex]?.hasPendingWithdrawalsFromBeforeUpgrade;

          const stakedToken =
            poolData[poolIndex]?.poolInfos?.stakedTokenAddress &&
            getTokenByAddress(poolData[poolIndex]?.poolInfos.stakedTokenAddress);

          const poolRewardWeiPerBlock =
            ucoreVaultRewardWeiPerBlock?.rewardPerBlockWei &&
            ucoreVaultTotalAllocationPointsData?.totalAllocationPoints &&
            poolData[poolIndex]?.poolInfos.allocationPoint &&
            ucoreVaultRewardWeiPerBlock.rewardPerBlockWei
              .multipliedBy(poolData[poolIndex]?.poolInfos.allocationPoint)
              .div(ucoreVaultTotalAllocationPointsData.totalAllocationPoints);

          const dailyEmissionWei =
            poolRewardWeiPerBlock && poolRewardWeiPerBlock.multipliedBy(BLOCKS_PER_DAY);

          const stakingAprPercentage =
            dailyEmissionWei &&
            totalStakedWeiData &&
            dailyEmissionWei
              .multipliedBy(DAYS_PER_YEAR)
              .div(totalStakedWeiData.balanceWei)
              .multipliedBy(100)
              .toNumber();

          if (
            stakedToken &&
            lockingPeriodMs &&
            dailyEmissionWei &&
            totalStakedWeiData &&
            stakingAprPercentage
          ) {
            const vault: Vault = {
              rewardToken: TOKENS.ucore,
              stakedToken,
              lockingPeriodMs,
              dailyEmissionWei,
              totalStakedWei: totalStakedWeiData.balanceWei,
              stakingAprPercentage,
              userStakedWei,
              poolIndex,
              hasPendingWithdrawalsFromBeforeUpgrade,
            };

            return [...acc, vault];
          }

          return acc;
        },
        [],
      ),
    [
      ucoreVaultPoolCountData.poolCount,
      JSON.stringify(poolData),
      JSON.stringify(poolBalances),
      ucoreVaultRewardWeiPerBlock?.rewardPerBlockWei.toFixed(),
      ucoreVaultTotalAllocationPointsData?.totalAllocationPoints,
    ],
  );

  return {
    data,
    isLoading,
  };
};

export default useGetVestingVaults;
