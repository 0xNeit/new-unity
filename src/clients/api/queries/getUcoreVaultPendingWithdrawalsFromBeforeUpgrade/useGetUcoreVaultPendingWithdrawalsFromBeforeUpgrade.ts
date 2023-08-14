import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultPendingWithdrawalsFromBeforeUpgrade, {
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeInput,
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
} from 'clients/api/queries/getUcoreVaultPendingWithdrawalsFromBeforeUpgrade';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
  Error,
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
  GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeOutput,
  [
    FunctionKey.GET_UCORE_VAULT_PENDING_WITHDRAWALS_FROM_BEFORE_UPGRADE,
    Omit<GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeInput, 'ucoreVaultContract'>,
  ]
>;

const useGetUcoreVaultPendingWithdrawalsFromBeforeUpgrade = (
  params: Omit<GetUcoreVaultPendingWithdrawalsFromBeforeUpgradeInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    [FunctionKey.GET_UCORE_VAULT_PENDING_WITHDRAWALS_FROM_BEFORE_UPGRADE, params],
    () => getUcoreVaultPendingWithdrawalsFromBeforeUpgrade({ ucoreVaultContract, ...params }),
    options,
  );
};

export default useGetUcoreVaultPendingWithdrawalsFromBeforeUpgrade;
