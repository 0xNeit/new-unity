import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';

export interface GetUcoreWithdrawableAmountInput {
  accountAddress: string;
  ucoreVestingContract?: ContractTypeByName<'ucoreVesting'>;
}

export interface GetUcoreWithdrawableAmountOutput {
  totalWithdrawableAmount: BigNumber;
  totalVestedAmount: BigNumber;
  totalWithdrawnAmount: BigNumber;
}

const getUcoreWithdrawableAmount = async ({
  ucoreVestingContract,
  accountAddress,
}: GetUcoreWithdrawableAmountInput): Promise<GetUcoreWithdrawableAmountOutput | undefined> => {
  if (!ucoreVestingContract) {
    return undefined;
  }

  const resp = await ucoreVestingContract.getWithdrawableAmount(accountAddress);

  return {
    totalWithdrawableAmount: new BigNumber(resp.totalWithdrawableAmount.toString()),
    totalVestedAmount: new BigNumber(resp.totalVestedAmount.toString()),
    totalWithdrawnAmount: new BigNumber(resp.totalWithdrawnAmount.toString()),
  };
};

export default getUcoreWithdrawableAmount;
