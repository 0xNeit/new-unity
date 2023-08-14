import BigNumber from 'bignumber.js';
import { ContractCallResults } from 'core-multicall';

import { GetUaiRepayAmountWithInterestsOutput } from './types';

const formatToOutput = ({
  contractCallResults,
}: {
  contractCallResults: ContractCallResults;
}): GetUaiRepayAmountWithInterestsOutput => {
  const [uaiRepayAmountWithInterestsWei] =
    contractCallResults.results.getUaiRepayTotalAmount.callsReturnContext[1].returnValues.map(
      unformattedBigNumber => new BigNumber(unformattedBigNumber.hex),
    );

  return {
    uaiRepayAmountWithInterestsWei,
  };
};

export default formatToOutput;
