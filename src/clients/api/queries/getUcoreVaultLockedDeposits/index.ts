import formatToLockedDeposit from './formatToLockedDeposit';
import { GetUcoreVaultLockedDepositsInput, GetUcoreVaultLockedDepositsOutput } from './types';

export * from './types';

const getUcoreVaultLockedDeposits = async ({
  ucoreVaultContract,
  rewardTokenAddress,
  poolIndex,
  accountAddress,
}: GetUcoreVaultLockedDepositsInput): Promise<GetUcoreVaultLockedDepositsOutput> => {
  const res = await ucoreVaultContract.getWithdrawalRequests(
    rewardTokenAddress,
    poolIndex,
    accountAddress,
  );
  return {
    lockedDeposits: res.map(formatToLockedDeposit),
  };
};

export default getUcoreVaultLockedDeposits;
