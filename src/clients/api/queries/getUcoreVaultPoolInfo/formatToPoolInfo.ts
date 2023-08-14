import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

import { GetUcoreVaultPoolInfoOutput } from './types';

const formatToUserInfo = ({
  token,
  allocPoint,
  lastRewardBlock,
  accRewardPerShare,
  lockPeriod,
}: Awaited<ReturnType<UcoreVault['poolInfos']>>): GetUcoreVaultPoolInfoOutput => ({
  stakedTokenAddress: token,
  allocationPoint: allocPoint.toNumber(),
  lastRewardBlock: lastRewardBlock.toNumber(),
  accRewardPerShare: new BigNumber(accRewardPerShare.toString()),
  // Convert lockPeriod from seconds to milliseconds
  lockingPeriodMs: lockPeriod.toNumber() * 1000,
});

export default formatToUserInfo;
