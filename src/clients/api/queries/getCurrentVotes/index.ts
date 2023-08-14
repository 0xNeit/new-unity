import BigNumber from 'bignumber.js';

import { UcoreVault } from 'types/contracts';

export interface GetCurrentVotesInput {
  ucoreVaultContract: UcoreVault;
  accountAddress: string;
}

export type GetCurrentVotesOutput = {
  votesWei: BigNumber;
};

const getCurrentVotes = async ({
  ucoreVaultContract,
  accountAddress,
}: GetCurrentVotesInput): Promise<GetCurrentVotesOutput> => {
  const resp = await ucoreVaultContract.getCurrentVotes(accountAddress);

  return {
    votesWei: new BigNumber(resp.toString()),
  };
};

export default getCurrentVotes;
