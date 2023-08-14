import { QueryObserverOptions, useQuery } from 'react-query';

import {
  GetUaiVaultUserInfoInput,
  GetUaiVaultUserInfoOutput,
  getUaiVaultUserInfo,
} from 'clients/api';
import { useUaiVaultContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUaiVaultUserInfoOutput,
  Error,
  GetUaiVaultUserInfoOutput,
  GetUaiVaultUserInfoOutput,
  [FunctionKey.GET_UAI_VAULT_USER_INFO, string]
>;

const useGetUaiVaultUserInfo = (
  { accountAddress }: Omit<GetUaiVaultUserInfoInput, 'uaiVaultContract'>,
  options?: Options,
) => {
  const uaiVaultContract = useUaiVaultContract();

  return useQuery(
    [FunctionKey.GET_UAI_VAULT_USER_INFO, accountAddress],
    () => getUaiVaultUserInfo({ uaiVaultContract, accountAddress }),
    options,
  );
};

export default useGetUaiVaultUserInfo;
