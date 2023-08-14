import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultTotalAllocationPoints, {
  GetUcoreVaultTotalAllocPointsInput,
  GetUcoreVaultTotalAllocPointsOutput,
} from 'clients/api/queries/getUcoreVaultTotalAllocationPoints';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultTotalAllocPointsOutput,
  Error,
  GetUcoreVaultTotalAllocPointsOutput,
  GetUcoreVaultTotalAllocPointsOutput,
  [FunctionKey.GET_UCORE_VAULT_TOTAL_ALLOCATION_POINTS, string]
>;

const useGetUcoreVaultTotalAllocationPoints = (
  { tokenAddress }: Omit<GetUcoreVaultTotalAllocPointsInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    [FunctionKey.GET_UCORE_VAULT_TOTAL_ALLOCATION_POINTS, tokenAddress],
    () => getUcoreVaultTotalAllocationPoints({ tokenAddress, ucoreVaultContract }),
    options,
  );
};

export default useGetUcoreVaultTotalAllocationPoints;
