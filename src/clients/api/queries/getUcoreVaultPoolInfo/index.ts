import formatToPoolInfo from './formatToPoolInfo';
import { GetUcoreVaultPoolInfoInput, GetUcoreVaultPoolInfoOutput } from './types';

export * from './types';

const getUcoreVaultPoolInfo = async ({
  ucoreVaultContract,
  rewardTokenAddress,
  poolIndex,
}: GetUcoreVaultPoolInfoInput): Promise<GetUcoreVaultPoolInfoOutput> => {
  const res = await ucoreVaultContract.poolInfos(rewardTokenAddress, poolIndex);
  return formatToPoolInfo(res);
};

export default getUcoreVaultPoolInfo;
