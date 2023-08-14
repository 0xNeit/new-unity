import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultPoolInfo, {
  GetUcoreVaultPoolInfoInput,
  GetUcoreVaultPoolInfoOutput,
} from 'clients/api/queries/getUcoreVaultPoolInfo';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultPoolInfoOutput,
  Error,
  GetUcoreVaultPoolInfoOutput,
  GetUcoreVaultPoolInfoOutput,
  [FunctionKey.GET_UCORE_VAULT_POOL_INFOS, Omit<GetUcoreVaultPoolInfoInput, 'ucoreVaultContract'>]
>;

const useGetUcoreVaultPoolInfo = (
  params: Omit<GetUcoreVaultPoolInfoInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    [FunctionKey.GET_UCORE_VAULT_POOL_INFOS, params],
    () => getUcoreVaultPoolInfo({ ucoreVaultContract, ...params }),
    options,
  );
};

export default useGetUcoreVaultPoolInfo;
