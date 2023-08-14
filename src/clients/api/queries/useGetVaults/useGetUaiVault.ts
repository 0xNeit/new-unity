import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Vault } from 'types';
import { areTokensEqual, convertWeiToTokens, getContractAddress } from 'utils';

import {
  useGetBalanceOf,
  useGetMainAssets,
  useGetUaiVaultUserInfo,
  useGetUcoreUaiVaultDailyRate,
} from 'clients/api';
import { DAYS_PER_YEAR } from 'constants/daysPerYear';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import { TOKENS } from 'constants/tokens';

const UAI_VAULT_ADDRESS = getContractAddress('uaiVault');

export interface UseGetUaiVaultOutput {
  isLoading: boolean;
  data: Vault | undefined;
}

const useGetUaiVault = ({ accountAddress }: { accountAddress?: string }): UseGetUaiVaultOutput => {
  const { data: totalUaiStakedData, isLoading: isGetTotalUaiStakedWeiLoading } = useGetBalanceOf(
    {
      accountAddress: UAI_VAULT_ADDRESS,
      token: TOKENS.uai,
    },
    {
      refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    },
  );

  const { data: uaiVaultUserInfo, isLoading: isGetUaiVaultUserInfoLoading } =
    useGetUaiVaultUserInfo(
      {
        accountAddress: accountAddress || '',
      },
      {
        enabled: !!accountAddress,
      },
    );

  const { data: uaiVaultDailyRateData, isLoading: isGetUaiVaultDailyRateWeiLoading } =
    useGetUcoreUaiVaultDailyRate();

  const { data: getMainAssetsData, isLoading: isGetMainAssetsLoading } = useGetMainAssets({
    accountAddress,
  });
  const ucorePriceDollars: BigNumber | undefined = useMemo(
    () =>
      (getMainAssetsData?.assets || [])
        .find(asset => areTokensEqual(asset.vToken.underlyingToken, TOKENS.ucore))
        ?.tokenPriceCents.dividedBy(100),
    [getMainAssetsData?.assets],
  );

  const data: Vault | undefined = useMemo(() => {
    if (!totalUaiStakedData || !uaiVaultDailyRateData || !ucorePriceDollars) {
      return undefined;
    }

    const stakingAprPercentage = convertWeiToTokens({
      valueWei: uaiVaultDailyRateData.dailyRateWei,
      token: TOKENS.ucore,
    })
      .multipliedBy(ucorePriceDollars) // We assume 1 UAI = 1 dollar
      .multipliedBy(DAYS_PER_YEAR)
      .dividedBy(
        convertWeiToTokens({
          valueWei: totalUaiStakedData.balanceWei,
          token: TOKENS.uai,
        }),
      )
      .multipliedBy(100)
      .toNumber();

    return {
      rewardToken: TOKENS.ucore,
      stakedToken: TOKENS.uai,
      dailyEmissionWei: uaiVaultDailyRateData.dailyRateWei,
      totalStakedWei: totalUaiStakedData.balanceWei,
      stakingAprPercentage,
      userStakedWei: uaiVaultUserInfo?.stakedUaiWei,
    };
  }, [
    totalUaiStakedData?.balanceWei.toFixed(),
    uaiVaultDailyRateData?.dailyRateWei.toFixed(),
    ucorePriceDollars?.toFixed(),
    JSON.stringify(uaiVaultUserInfo),
  ]);

  const isLoading =
    isGetTotalUaiStakedWeiLoading ||
    isGetUaiVaultDailyRateWeiLoading ||
    isGetMainAssetsLoading ||
    isGetUaiVaultUserInfoLoading;

  return {
    data,
    isLoading,
  };
};

export default useGetUaiVault;
