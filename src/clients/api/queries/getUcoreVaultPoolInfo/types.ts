import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultPoolInfoInput {
  ucoreVaultContract: UcoreVault;
  rewardTokenAddress: string;
  poolIndex: number;
}

export interface GetUcoreVaultPoolInfoOutput {
  stakedTokenAddress: string;
  allocationPoint: number;
  lastRewardBlock: number;
  accRewardPerShare: BigNumber;
  lockingPeriodMs: number;
}
