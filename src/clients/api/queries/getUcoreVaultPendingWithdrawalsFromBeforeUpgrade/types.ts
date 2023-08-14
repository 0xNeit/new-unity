import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeInput {
  ucoreVaultContract: UcoreVault;
  rewardTokenAddress: string;
  poolIndex: number;
  accountAddress: string;
}

export interface GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput {
  pendingWithdrawalsFromBeforeUpgradeWei: BigNumber;
}
