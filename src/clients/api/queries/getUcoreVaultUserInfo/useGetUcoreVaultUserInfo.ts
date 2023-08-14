import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultUserInfo, {
  GetUcoreVaultUserInfoInput,
  GetUcoreVaultUserInfoOutput,
} from 'clients/api/queries/getUcoreVaultUserInfo';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultUserInfoOutput,
  Error,
  GetUcoreVaultUserInfoOutput,
  GetUcoreVaultUserInfoOutput,
  [FunctionKey.GET_UCORE_VAULT_USER_INFO, Omit<GetUcoreVaultUserInfoInput, 'ucoreVaultContract'>]
>;

const useGetUcoreVaultUserInfo = (
  params: Omit<GetUcoreVaultUserInfoInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    [FunctionKey.GET_UCORE_VAULT_USER_INFO, params],
    () => getUcoreVaultUserInfo({ ucoreVaultContract, ...params }),
    options,
  );
};

export default useGetUcoreVaultUserInfo;
