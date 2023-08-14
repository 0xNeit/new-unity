import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultLockedDeposits, {
  GetUcoreVaultLockedDepositsInput,
  GetUcoreVaultLockedDepositsOutput,
} from 'clients/api/queries/getUcoreVaultLockedDeposits';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultLockedDepositsOutput,
  Error,
  GetUcoreVaultLockedDepositsOutput,
  GetUcoreVaultLockedDepositsOutput,
  [
    FunctionKey.GET_UCORE_VAULT_WITHDRAWAL_REQUESTS,
    Omit<GetUcoreVaultLockedDepositsInput, 'ucoreVaultContract'>,
  ]
>;

const useGetUcoreVaultLockedDeposits = (
  params: Omit<GetUcoreVaultLockedDepositsInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    [FunctionKey.GET_UCORE_VAULT_WITHDRAWAL_REQUESTS, params],
    () => getUcoreVaultLockedDeposits({ ucoreVaultContract, ...params }),
    options,
  );
};

export default useGetUcoreVaultLockedDeposits;
