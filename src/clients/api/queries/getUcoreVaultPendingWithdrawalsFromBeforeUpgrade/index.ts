import BigNumber from 'bignumber.js';

import {
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeInput,
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
} from './types';

export * from './types';

const getUcoreVaultPendingWithdrawalsFromBeforeUpgrade = async ({
  ucoreVaultContract,
  rewardTokenAddress,
  poolIndex,
  accountAddress,
}: GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeInput): Promise<GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput> => {
  const pendingWithdrawalsFromBeforeUpgradeWei =
    await ucoreVaultContract.pendingWithdrawalsBeforeUpgrade(
      rewardTokenAddress,
      poolIndex,
      accountAddress,
    );

  return {
    pendingWithdrawalsFromBeforeUpgradeWei: new BigNumber(
      pendingWithdrawalsFromBeforeUpgradeWei.toString(),
    ),
  };
};

export default getUcoreVaultPendingWithdrawalsFromBeforeUpgrade;
