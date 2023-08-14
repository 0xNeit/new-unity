import { TOKENS } from 'constants/tokens';
import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultPoolCountInput {
  ucoreVaultContract: UcoreVault;
}

export type GetUcoreVaultPoolCountOutput = {
  poolCount: number;
};

const getUcoreVaultPoolCount = async ({
  ucoreVaultContract,
}: GetUcoreVaultPoolCountInput): Promise<GetUcoreVaultPoolCountOutput> => {
  const ucoreTokenAddress = TOKENS.ucore.address;
  const ucoreVaultPoolLength = await ucoreVaultContract.poolLength(ucoreTokenAddress);

  return {
    poolCount: ucoreVaultPoolLength.toNumber(),
  };
};

export default getUcoreVaultPoolCount;
