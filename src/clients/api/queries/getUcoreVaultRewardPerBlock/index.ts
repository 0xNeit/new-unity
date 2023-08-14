import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultRewardPerBlockInput {
  ucoreVaultContract: UcoreVault;
  tokenAddress: string;
}

export type GetUcoreVaultRewardPerBlockOutput = {
  rewardPerBlockWei: BigNumber;
};

const getUcoreVaultRewardPerBlock = async ({
  ucoreVaultContract,
  tokenAddress,
}: GetUcoreVaultRewardPerBlockInput): Promise<GetUcoreVaultRewardPerBlockOutput> => {
  const res = await ucoreVaultContract.rewardTokenAmountsPerBlock(tokenAddress);

  return {
    rewardPerBlockWei: new BigNumber(res.toString()),
  };
};

export default getUcoreVaultRewardPerBlock;
