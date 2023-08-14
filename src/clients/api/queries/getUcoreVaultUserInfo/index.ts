import formatToUserInfo from './formatToUserInfo';
import { GetUcoreVaultUserInfoInput, GetUcoreVaultUserInfoOutput } from './types';

export * from './types';

const getUcoreVaultUserInfo = async ({
  ucoreVaultContract,
  rewardTokenAddress,
  poolIndex,
  accountAddress,
}: GetUcoreVaultUserInfoInput): Promise<GetUcoreVaultUserInfoOutput> => {
  const res = await ucoreVaultContract.getUserInfo(rewardTokenAddress, poolIndex, accountAddress);
  return formatToUserInfo(res);
};

export default getUcoreVaultUserInfo;
