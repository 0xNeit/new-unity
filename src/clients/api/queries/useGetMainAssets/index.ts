import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Asset, AssetDistribution } from 'types';
import {
  calculateCollateralValue,
  convertDollarsToCents,
  convertTokensToWei,
  convertWeiToTokens,
  getVTokenByAddress,
  indexBy,
} from 'utils';

import {
  GetVTokenBalancesAllOutput,
  useGetMainAssetsInAccount,
  // useGetMainMarkets,
  useGetVTokenBalancesAll,
  useGetUaiRepayAmountWithInterests,
} from 'clients/api';
import { COMPOUND_MANTISSA } from 'constants/compoundMantissa';
import MAX_UINT256 from 'constants/maxUint256';
import { TOKENS, VBEP_TOKENS } from 'constants/tokens';

export interface Data {
  assets: Asset[];
  userTotalBorrowLimitCents: BigNumber;
  userTotalBorrowBalanceCents: BigNumber;
  userTotalSupplyBalanceCents: BigNumber;
}

export interface UseGetMainAssetsOutput {
  isLoading: boolean;
  data?: Data;
}

const vTokenAddresses = Object.values(VBEP_TOKENS).reduce(
  (acc, item) => (item.address ? [...acc, item.address] : acc),
  [] as string[],
);

const useGetMainAssets = ({
  accountAddress,
}: {
  accountAddress?: string;
}): UseGetMainAssetsOutput => {
  const {
    data: userUaiRepayAmountWithInterests,
    isLoading: isGetuserUaiRepayAmountWithInterestsLoading,
  } = useGetUaiRepayAmountWithInterests(
    {
      accountAddress: accountAddress || '',
    },
    {
      enabled: !!accountAddress,
    },
  );

  // const { data: getMainMarketsData, isLoading: isGetMainMarketsLoading } = useGetMainMarkets();

  const {
    data: assetsInAccount = {
      tokenAddresses: [],
    },
    isLoading: isGetMainAssetsInAccountLoading,
  } = useGetMainAssetsInAccount(
    { accountAddress: accountAddress || '' },
    {
      enabled: !!accountAddress,
      placeholderData: {
        tokenAddresses: [],
      },
    },
  );

  const {
    data: vTokenBalancesAccount = { balances: [] },
    isLoading: isGetVTokenBalancesAccountLoading,
  } = useGetVTokenBalancesAll(
    { account: accountAddress || '', vTokenAddresses },
    { enabled: !!accountAddress, placeholderData: { balances: [] } },
  );

  const vTokenBalances = useMemo(
    () =>
      indexBy(
        (item: GetVTokenBalancesAllOutput['balances'][number]) => item.vToken.toLowerCase(), // index by vToken address
        vTokenBalancesAccount.balances,
      ),
    [vTokenBalancesAccount],
  );

  const isLoading =
    // isGetMainMarketsLoading ||
    isGetMainAssetsInAccountLoading ||
    isGetVTokenBalancesAccountLoading ||
    isGetuserUaiRepayAmountWithInterestsLoading;

  const data = useMemo(() => {
    /* if (!getMainMarketsData?.markets) {
      return undefined;
    } */

    /* const {
      assets,
      userTotalBorrowBalanceCents,
      userTotalBorrowLimitCents,
      userTotalSupplyBalanceCents,
    } = getMainMarketsData.markets.reduce(
      (acc, market) => {
        const vToken = getVTokenByAddress(market.address);

        // Skip token if it isn't listed
        if (!vToken) {
          return acc;
        }

        const vTokenAddress = vToken.address.toLowerCase();
        const isCollateralOfUser = (assetsInAccount.tokenAddresses || [])
          .map(address => address.toLowerCase())
          .includes(vTokenAddress);

        const tokenPriceCents = new BigNumber(convertDollarsToCents(market.tokenPrice));

        let userWalletBalanceTokens = new BigNumber(0);
        let userSupplyBalanceTokens = new BigNumber(0);
        let userSupplyBalanceCents = new BigNumber(0);
        let userBorrowBalanceTokens = new BigNumber(0);
        let userBorrowBalanceCents = new BigNumber(0);
        let userWalletBalanceCents = new BigNumber(0);

        const wallet = vTokenBalances && vTokenBalances[vTokenAddress];
        if (accountAddress && wallet) {
          const toDecimalAmount = (mantissa: string) =>
            new BigNumber(mantissa).shiftedBy(-vToken.underlyingToken.decimals);

          userWalletBalanceTokens = toDecimalAmount(wallet.tokenBalance);
          userWalletBalanceCents = userWalletBalanceTokens.times(tokenPriceCents);

          userSupplyBalanceTokens = toDecimalAmount(wallet.balanceOfUnderlying);
          userSupplyBalanceCents = userSupplyBalanceTokens.times(tokenPriceCents);

          userBorrowBalanceTokens = toDecimalAmount(wallet.borrowBalanceCurrent);
          userBorrowBalanceCents = userBorrowBalanceTokens.times(tokenPriceCents);
        }

        const reserveTokens = market.totalReserves
          ? convertWeiToTokens({
              valueWei: new BigNumber(market.totalReserves),
              token: vToken.underlyingToken,
            })
          : new BigNumber(0);

        const cashTokens = market.cash
          ? convertWeiToTokens({
              valueWei: new BigNumber(market.cash),
              token: vToken.underlyingToken,
            })
          : new BigNumber(0);

        const exchangeRateVTokens = market.exchangeRate
          ? new BigNumber(1).div(
              new BigNumber(market.exchangeRate).div(
                new BigNumber(10).pow(18 + vToken.underlyingToken.decimals - vToken.decimals),
              ),
            )
          : new BigNumber(0);

        const supplyPercentageRatePerBlock = market.supplyRatePerBlock
          ? new BigNumber(market.supplyRatePerBlock).dividedBy(COMPOUND_MANTISSA)
          : new BigNumber(0);

        const borrowPercentageRatePerBlock = market.borrowRatePerBlock
          ? new BigNumber(market.borrowRatePerBlock).dividedBy(COMPOUND_MANTISSA)
          : new BigNumber(0);

        const supplyUcoreDistribution: AssetDistribution = {
          token: TOKENS.ucore,
          dailyDistributedTokens: new BigNumber(market.supplierDailyUcore || 0).div(
            new BigNumber(10).pow(TOKENS.ucore.decimals),
          ),
          apyPercentage: new BigNumber(market.supplyUcoreApy || 0),
        };

        const borrowUcoreDistribution: AssetDistribution = {
          token: TOKENS.ucore,
          dailyDistributedTokens: new BigNumber(market.borrowerDailyUcore || 0).div(
            new BigNumber(10).pow(TOKENS.ucore.decimals),
          ),
          apyPercentage: new BigNumber(market.borrowUcoreApy || 0),
        };

        const asset: Asset = {
          vToken,
          tokenPriceCents,
          supplyApyPercentage: new BigNumber(market.supplyApy || 0),
          borrowApyPercentage: new BigNumber(market.borrowApy || 0),
          collateralFactor: new BigNumber(market.collateralFactor || 0)
            .div(COMPOUND_MANTISSA)
            .toNumber(),
          reserveFactor: new BigNumber(market.reserveFactor || 0).div(COMPOUND_MANTISSA).toNumber(),
          reserveTokens,
          cashTokens,
          exchangeRateVTokens,
          liquidityCents: new BigNumber(market.liquidity || 0).multipliedBy(100),
          borrowCapTokens: +market.borrowCaps === 0 ? undefined : new BigNumber(market.borrowCaps),
          supplyCapTokens: new BigNumber(market.supplyCaps)
            .multipliedBy(COMPOUND_MANTISSA)
            .isEqualTo(MAX_UINT256)
            ? undefined
            : new BigNumber(market.supplyCaps),
          supplierCount: market.supplierCount || 0,
          borrowerCount: market.borrowerCount || 0,
          supplyBalanceTokens: new BigNumber(market.totalSupply2 || 0).div(exchangeRateVTokens),
          supplyBalanceCents: convertDollarsToCents(
            new BigNumber(market.totalSupplyUsd ? market.totalSupplyUsd : 0),
          ),
          borrowBalanceTokens: new BigNumber(market.totalBorrows2 || 0),
          borrowBalanceCents: convertDollarsToCents(
            new BigNumber(market.totalBorrowsUsd ? +market.totalBorrowsUsd : 0),
          ),
          supplyPercentageRatePerBlock,
          borrowPercentageRatePerBlock,
          isCollateralOfUser,
          userWalletBalanceTokens,
          userWalletBalanceCents,
          userPercentOfLimit: 0,
          userSupplyBalanceTokens,
          userSupplyBalanceCents,
          userBorrowBalanceTokens,
          userBorrowBalanceCents,
          supplyDistributions: [supplyUcoreDistribution],
          borrowDistributions: [borrowUcoreDistribution],
        };

        acc.userTotalBorrowBalanceCents =
          acc.userTotalBorrowBalanceCents.plus(userBorrowBalanceCents);

        acc.userTotalSupplyBalanceCents =
          acc.userTotalSupplyBalanceCents.plus(userSupplyBalanceCents);

        // Create borrow limit based on assets supplied as isCollateralOfUser
        if (asset.isCollateralOfUser) {
          acc.userTotalBorrowLimitCents = acc.userTotalBorrowLimitCents.plus(
            calculateCollateralValue({
              amountWei: convertTokensToWei({
                value: asset.userSupplyBalanceTokens,
                token: vToken.underlyingToken,
              }),
              token: asset.vToken.underlyingToken,
              tokenPriceCents: asset.tokenPriceCents,
              collateralFactor: asset.collateralFactor,
            }),
          );
        }

        return { ...acc, assets: [...acc.assets, asset] };
      },
      {
        assets: [] as Asset[],
        userTotalBorrowBalanceCents: new BigNumber(0),
        userTotalBorrowLimitCents: new BigNumber(0),
        userTotalSupplyBalanceCents: new BigNumber(0),
      },
    ); */

    // let assetList = assets;

    /* const userTotalBorrowBalanceWithUserMintedUai = userTotalBorrowBalanceCents.plus(
      userUaiRepayAmountWithInterests?.uaiRepayAmountWithInterestsWei
        ? convertWeiToTokens({
            valueWei: userUaiRepayAmountWithInterests?.uaiRepayAmountWithInterestsWei,
            token: TOKENS.uai,
          })
            // Convert UAI to dollar cents (we assume 1 UAI = 1 dollar)
            .times(100)
            .dp(0)
        : 0,
    ); */

    // percent of limit
    /* assetList = assetList.map((item: Asset) => ({
      ...item,
      userPercentOfLimit: new BigNumber(item.userBorrowBalanceCents)
        .times(100)
        .div(userTotalBorrowLimitCents)
        .dp(2)
        .toNumber(),
    })); */

    return {
      // assets: assetList,
      // userTotalBorrowBalanceCents: userTotalBorrowBalanceWithUserMintedUai,
      // userTotalBorrowLimitCents,
      // userTotalSupplyBalanceCents,
    };
  }, [
    userUaiRepayAmountWithInterests?.uaiRepayAmountWithInterestsWei,
    // getMainMarketsData?.markets,
    assetsInAccount,
    vTokenBalances,
  ]);

  return {
    isLoading,
    // data,
    // TODO: handle errors and retry scenarios
  };
};

export default useGetMainAssets;
