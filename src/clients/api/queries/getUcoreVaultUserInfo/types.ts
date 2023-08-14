import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultUserInfoInput {
  ucoreVaultContract: UcoreVault;
  rewardTokenAddress: string;
  poolIndex: number;
  accountAddress: string;
}

export interface GetUcoreVaultUserInfoOutput {
  stakedAmountWei: BigNumber;
  pendingWithdrawalsTotalAmountWei: BigNumber;
  rewardDebtAmountWei: BigNumber;
}
