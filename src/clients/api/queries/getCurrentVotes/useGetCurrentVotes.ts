import { QueryObserverOptions, useQuery } from 'react-query';

import getCurrentVotes, {
  GetCurrentVotesInput,
  GetCurrentVotesOutput,
} from 'clients/api/queries/getCurrentVotes';
import { useUcoreVaultProxyContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetCurrentVotesOutput,
  Error,
  GetCurrentVotesOutput,
  GetCurrentVotesOutput,
  [FunctionKey.GET_CURRENT_VOTES, string]
>;

const useGetCurrentVotes = (
  { accountAddress }: Omit<GetCurrentVotesInput, 'ucoreVaultContract'>,
  options?: Options,
) => {
  const ucoreVaultContract = useUcoreVaultProxyContract();
  return useQuery(
    [FunctionKey.GET_CURRENT_VOTES, accountAddress],
    () => getCurrentVotes({ ucoreVaultContract, accountAddress }),
    options,
  );
};

export default useGetCurrentVotes;
