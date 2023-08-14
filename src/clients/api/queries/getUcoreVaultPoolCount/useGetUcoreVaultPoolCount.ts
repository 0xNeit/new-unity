import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultPoolCount, {
  GetUcoreVaultPoolCountOutput,
} from 'clients/api/queries/getUcoreVaultPoolCount';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultPoolCountOutput,
  Error,
  GetUcoreVaultPoolCountOutput,
  GetUcoreVaultPoolCountOutput,
  FunctionKey.GET_UCORE_VAULT_POOLS_COUNT
>;

const useGetUcoreVaultPoolCount = (options?: Options) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    FunctionKey.GET_UCORE_VAULT_POOLS_COUNT,
    () => getUcoreVaultPoolCount({ ucoreVaultContract }),
    options,
  );
};

export default useGetUcoreVaultPoolCount;
