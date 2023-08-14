import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

import { GetUcoreVaultUserInfoOutput } from './types';

const formatToUserInfo = ({
  amount,
  pendingWithdrawals,
  rewardDebt,
}: Awaited<ReturnType<UcoreVault['getUserInfo']>>): GetUcoreVaultUserInfoOutput => ({
  stakedAmountWei: new BigNumber(amount.toString()),
  pendingWithdrawalsTotalAmountWei: new BigNumber(pendingWithdrawals.toString()),
  rewardDebtAmountWei: new BigNumber(rewardDebt.toString()),
});

export default formatToUserInfo;
