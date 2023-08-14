import BigNumber from 'bignumber.js';

import { UaiVault } from 'types/contracts';

export interface GetUaiVaultUserInfoInput {
  uaiVaultContract: UaiVault;
  accountAddress: string;
}

export interface GetUaiVaultUserInfoOutput {
  stakedUaiWei: BigNumber;
}
