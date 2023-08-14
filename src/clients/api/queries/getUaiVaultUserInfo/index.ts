import formatToUserInfo from './formatToUserInfo';
import { GetUaiVaultUserInfoInput, GetUaiVaultUserInfoOutput } from './types';

export * from './types';

const getUaiVaultUserInfo = async ({
  uaiVaultContract,
  accountAddress,
}: GetUaiVaultUserInfoInput): Promise<GetUaiVaultUserInfoOutput> => {
  const res = await uaiVaultContract.userInfo(accountAddress);
  return formatToUserInfo(res);
};

export default getUaiVaultUserInfo;
