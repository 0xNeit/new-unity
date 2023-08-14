import { UcoreVault } from 'types/contracts';

export interface GetUcoreVaultTotalAllocPointsInput {
  ucoreVaultContract: UcoreVault;
  tokenAddress: string;
}

export type GetUcoreVaultTotalAllocPointsOutput = {
  totalAllocationPoints: number;
};

const getUcoreVaultTotalAllocationPoints = async ({
  ucoreVaultContract,
  tokenAddress,
}: GetUcoreVaultTotalAllocPointsInput): Promise<GetUcoreVaultTotalAllocPointsOutput> => {
  const res = await ucoreVaultContract.totalAllocPoints(tokenAddress);

  return {
    totalAllocationPoints: res.toNumber(),
  };
};

export default getUcoreVaultTotalAllocationPoints;
