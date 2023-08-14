import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreVaultRewardPerBlock, {
  GetUcoreVaultRewardPerBlockInput,
  GetUcoreVaultRewardPerBlockOutput,
} from 'clients/api/queries/getUcoreVaultRewardPerBlock';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreVaultRewardPerBlockOutput,
  Error,
  GetUcoreVaultRewardPerBlockOutput,
  GetUcoreVaultRewardPerBlockOutput,
  [FunctionKey.GET_UCORE_VAULT_REWARD_PER_BLOCK, string]
>;

const useGetUcoreVaultRewardPerBlock = (
  { tokenAddress }: Omit<GetUcoreVaultRewardPerBlockInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();

  return useQuery(
    [FunctionKey.GET_UCORE_VAULT_REWARD_PER_BLOCK, tokenAddress],
    () => getUcoreVaultRewardPerBlock({ tokenAddress, ucoreVaultContract }),
    options,
  );
};

export default useGetUcoreVaultRewardPerBlock;
