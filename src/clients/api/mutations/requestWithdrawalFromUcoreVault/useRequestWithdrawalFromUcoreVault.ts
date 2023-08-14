import { MutationObserverOptions, useMutation } from 'react-query';

import {
  RequestWithdrawalFromUcoreVaultInput,
  RequestWithdrawalFromUcoreVaultOutput,
  queryClient,
  requestWithdrawalFromUcoreVault,
} from 'clients/api';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

type Options = MutationObserverOptions<
  RequestWithdrawalFromUcoreVaultOutput,
  Error,
  Omit<RequestWithdrawalFromUcoreVaultInput, 'ucoreVaultContract'>
>;

const useRequestWithdrawalFromUcoreVault = (options?: Options) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useMutation(
    FunctionKey.REQUEST_WITHDRAWAL_FROM_UCORE_VAULT,
    (params: Omit<RequestWithdrawalFromUcoreVaultInput, 'ucoreVaultContract'>) =>
      requestWithdrawalFromUcoreVault({
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

        // Invalidate cached user withdrawal requests
        queryClient.invalidateQueries([
          FunctionKey.GET_UCORE_VAULT_WITHDRAWAL_REQUESTS,
          { accountAddress, rewardTokenAddress: TOKENS.ucore.address, poolIndex },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useRequestWithdrawalFromUcoreVault;
