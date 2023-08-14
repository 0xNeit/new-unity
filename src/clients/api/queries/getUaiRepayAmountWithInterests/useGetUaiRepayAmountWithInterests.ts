import { QueryObserverOptions, useQuery } from 'react-query';

import { getUaiRepayAmountWithInterests } from 'clients/api';
import { useGetUniqueContractAddress } from 'clients/contracts';
import { useMulticall } from 'clients/web3';
import FunctionKey from 'constants/functionKey';
import { logError } from 'context/ErrorLogger';

import { GetUaiRepayAmountWithInterestsInput, GetUaiRepayAmountWithInterestsOutput } from './types';

type Options = QueryObserverOptions<
  GetUaiRepayAmountWithInterestsOutput | undefined,
  Error,
  GetUaiRepayAmountWithInterestsOutput | undefined,
  GetUaiRepayAmountWithInterestsOutput | undefined,
  [
    FunctionKey.GET_UAI_REPAY_AMOUNT_WITH_INTERESTS,
    {
      accountAddress: string;
    },
  ]
>;

const useGetUaiRepayAmountWithInterests = (
  {
    accountAddress,
  }: Omit<GetUaiRepayAmountWithInterestsInput, 'multicall' | 'uaiControllerContractAddress'>,
  options?: Options,
) => {
  const multicall = useMulticall();
  const uaiControllerContractAddress = useGetUniqueContractAddress({
    name: 'uaiController',
  });

  const handleGetUaiRepayAmountWithInterests = async () => {
    if (!uaiControllerContractAddress) {
      logError('Contract infos missing for getUaiRepayAmountWithInterests query function call');
      return undefined;
    }

    return getUaiRepayAmountWithInterests({
      multicall,
      accountAddress,
      uaiControllerContractAddress,
    });
  };

  return useQuery(
    [
      FunctionKey.GET_UAI_REPAY_AMOUNT_WITH_INTERESTS,
      {
        accountAddress,
      },
    ],
    handleGetUaiRepayAmountWithInterests,
    // @ts-ignore
    options,
  );
};

export default useGetUaiRepayAmountWithInterests;
