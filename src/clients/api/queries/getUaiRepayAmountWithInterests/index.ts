import { ContractCallContext, ContractCallResults } from 'core-multicall';
import { uniqueContractInfos } from 'packages/contracts';

import formatToOutput from './formatToOutput';
import { GetUaiRepayAmountWithInterestsInput, GetUaiRepayAmountWithInterestsOutput } from './types';

const getUaiRepayAmountWithInterests = async ({
  multicall,
  uaiControllerContractAddress,
  accountAddress,
}: GetUaiRepayAmountWithInterestsInput): Promise<GetUaiRepayAmountWithInterestsOutput> => {
  // Generate call context
  const contractCallContext: ContractCallContext = {
    reference: 'getUaiRepayTotalAmount',
    contractAddress: uaiControllerContractAddress,
    abi: uniqueContractInfos.uaiController.abi,
    calls: [
      // Call (statically) accrueUAIInterest to calculate past accrued interests
      // before fetching all interests
      { reference: 'accrueUAIInterest', methodName: 'accrueUAIInterest', methodParameters: [] },
      {
        reference: 'getUAIRepayAmount',
        methodName: 'getUAIRepayAmount',
        methodParameters: [accountAddress],
      },
    ],
  };

  const contractCallResults: ContractCallResults = await multicall.call(contractCallContext);

  return formatToOutput({
    contractCallResults,
  });
};

export default getUaiRepayAmountWithInterests;
