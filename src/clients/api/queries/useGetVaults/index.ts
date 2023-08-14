import { useMemo } from 'react';
import { Vault } from 'types';

import useGetUaiVault from './useGetUaiVault';
import useGetVestingVaults from './useGetVestingVaults';

export interface UseGetVaultsOutput {
  isLoading: boolean;
  data: Vault[];
}

const useGetVaults = ({ accountAddress }: { accountAddress?: string }): UseGetVaultsOutput => {
  const { data: vestingVaults, isLoading: isGetVestingVaultsLoading } = useGetVestingVaults({
    accountAddress,
  });

  const { data: uaiVault, isLoading: isUaiVaultLoading } = useGetUaiVault({
    accountAddress,
  });

  const data: Vault[] = useMemo(() => {
    const allVaults = [...vestingVaults];

    if (uaiVault) {
      allVaults.push(uaiVault);
    }

    return allVaults;
  }, [JSON.stringify(vestingVaults), JSON.stringify(uaiVault)]);

  const isLoading = isGetVestingVaultsLoading || isUaiVaultLoading;

  return {
    data,
    isLoading,
  };
};

export default useGetVaults;
