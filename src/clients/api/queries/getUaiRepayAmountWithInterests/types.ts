import BigNumber from 'bignumber.js';
import { Multicall } from 'core-multicall';

export interface GetUaiRepayAmountWithInterestsInput {
  multicall: Multicall;
  accountAddress: string;
  uaiControllerContractAddress: string;
}

export type GetUaiRepayAmountWithInterestsOutput = {
  uaiRepayAmountWithInterestsWei: BigNumber;
};
