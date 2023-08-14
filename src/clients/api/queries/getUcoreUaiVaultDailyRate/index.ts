import BigNumber from 'bignumber.js';

import { BLOCKS_PER_DAY } from 'constants/core';
import { Comptroller } from 'types/contracts';

export interface GetUcoreUaiVaultDailyRateInput {
  comptrollerContract: Comptroller;
}

export type GetUcoreUaiVaultDailyRateOutput = {
  dailyRateWei: BigNumber;
};

const getUcoreUaiVaultDailyRate = async ({
  comptrollerContract,
}: GetUcoreUaiVaultDailyRateInput): Promise<GetUcoreUaiVaultDailyRateOutput> => {
  const resp = await comptrollerContract.ucoreUAIVaultRate();

  return {
    dailyRateWei: new BigNumber(resp.toString()).times(BLOCKS_PER_DAY),
  };
};

export default getUcoreUaiVaultDailyRate;
