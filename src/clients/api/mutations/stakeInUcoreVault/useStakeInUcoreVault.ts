import { MutationObserverOptions, useMutation } from 'react-query';
import { Token } from 'types';
import { getContractAddress } from 'utils';

import {
  StakeInUcoreVaultInput,
  StakeInUcoreVaultOutput,
  queryClient,
  stakeInUcoreVault,
} from 'clients/api';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

const UCORE_VAULT_PROXY_CONTRACT_ADDRESS = getContractAddress('ucoreVaultProxy');

type Options = MutationObserverOptions<
  StakeInUcoreVaultOutput,
  Error,
  Omit<StakeInUcoreVaultInput, 'ucoreVaultContract'>
>;

const useStakeInUcoreVault = ({ stakedToken }: { stakedToken: Token }, options?: Options) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useMutation(
    FunctionKey.STAKE_IN_UCORE_VAULT,
    (params: Omit<StakeInUcoreVaultInput, 'ucoreVaultContract'>) =>
      stakeInUcoreVault({
        ucoreVaultContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const { poolIndex } = onSuccessParams[1];
        const accountAddress = await ucoreVaultContract.signer.getAddress();

        // Invalidate cached user info
        queryClient.invalidateQueries([
          FunctionKey.GET_UCORE_VAULT_USER_INFO,
          { accountAddress, rewardTokenAddress: TOKENS.ucore.address, poolIndex },
        ]);

        // Invalidate cached user balance
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress,
            tokenAddress: stakedToken.address,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_TOKEN_ALLOWANCE,
          {
            tokenAddress: stakedToken.address,
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
            accountAddress: UCORE_VAULT_PROXY_CONTRACT_ADDRESS,
            tokenAddress: stakedToken.address,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_UCORE_VAULT_POOL_INFOS,
          { rewardTokenAddress: TOKENS.ucore.address, poolIndex },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeInUcoreVault;
