import { QueryObserverOptions, useQuery } from 'react-query';

import getUcoreWithdrawableAmount, {
  GetUcoreWithdrawableAmountInput,
  GetUcoreWithdrawableAmountOutput,
} from 'clients/api/queries/getUcoreWithdrawableAmount';
import { useGetUniqueContract } from 'clients/contracts';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetUcoreWithdrawableAmountOutput | undefined,
  Error,
  GetUcoreWithdrawableAmountOutput | undefined,
  GetUcoreWithdrawableAmountOutput | undefined,
  FunctionKey.GET_UCORE_WITHDRAWABLE_AMOUNT
>;

const useGetUcoreWithdrawableAmount = (
  { accountAddress }: Omit<GetUcoreWithdrawableAmountInput, 'ucoreVestingContract'>,
  options?: Options,
) => {
  const ucoreVestingContract = useGetUniqueContract({
    name: 'ucoreVesting',
  });

  return useQuery(
    FunctionKey.GET_UCORE_WITHDRAWABLE_AMOUNT,
    () => getUcoreWithdrawableAmount({ ucoreVestingContract, accountAddress }),
    {
      refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
      ...options,
    },
  );
};

export default useGetUcoreWithdrawableAmount;
