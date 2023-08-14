import BigNumber from 'bignumber.js';

import { UaiVault } from 'types/contracts';

import { GetUaiVaultUserInfoOutput } from './types';

const formatToUserInfo = ({
  amount,
}: Awaited<ReturnType<UaiVault['userInfo']>>): GetUaiVaultUserInfoOutput => ({
  stakedUaiWei: new BigNumber(amount.toString()),
});

export default formatToUserInfo;
