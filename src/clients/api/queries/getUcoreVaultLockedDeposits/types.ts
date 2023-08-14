import { LockedDeposit } from 'types';

import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultLockedDepositsInput {
  ucoreVaultContract: UcoreVault;
  rewardTokenAddress: string;
  poolIndex: number;
  accountAddress: string;
}

export type GetUcoreVaultLockedDepositsOutput = {
  lockedDeposits: LockedDeposit[];
};
