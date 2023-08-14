import { MutationObserverOptions, useMutation } from 'react-query';
import { getContractAddress } from 'utils';

import {
  StakeInUaiVaultInput,
  StakeInUaiVaultOutput,
  queryClient,
  stakeInUaiVault,
} from 'clients/api';
import { useUaiVaultContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

const UAI_VAULT_ADDRESS = getContractAddress('uaiVault');

type Options = MutationObserverOptions<
  StakeInUaiVaultOutput,
  Error,
  Omit<StakeInUaiVaultInput, 'uaiVaultContract'>
>;

const useStakeInUaiVault = (options?: Options) => {
  const uaiVaultContract = useUaiVaultContract();

  return useMutation(
    FunctionKey.STAKE_IN_UAI_VAULT,
    (params: Omit<StakeInUaiVaultInput, 'uaiVaultContract'>) =>
      stakeInUaiVault({
        uaiVaultContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const accountAddress = await uaiVaultContract.signer.getAddress();

        // Invalidate cached user info, including pending reward
        queryClient.invalidateQueries([FunctionKey.GET_UAI_VAULT_USER_INFO, accountAddress]);

        // Invalidate cached user balance
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress,
            tokenAddress: TOKENS.uai.address,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_TOKEN_ALLOWANCE,
          {
            tokenAddress: TOKENS.uai.address,
            accountAddress,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_TOKEN_BALANCES,
          {
            accountAddress,
          },
        ]);

        // Invalidate cached vault data
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress: UAI_VAULT_ADDRESS,
            tokenAddress: TOKENS.uai.address,
          },
        ]);

        queryClient.invalidateQueries(FunctionKey.GET_UCORE_UAI_VAULT_DAILY_RATE);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeInUaiVault;
