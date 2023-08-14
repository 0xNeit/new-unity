import BigNumber from 'bignumber.js';
import { VError } from 'errors';
import { Token } from 'types';
import { areTokensEqual } from 'utils';

import { useStakeInUaiVault, useStakeInUcoreVault } from 'clients/api';
import { TOKENS } from 'constants/tokens';

export interface UseStakeInVaultInput {
  stakedToken: Token;
  rewardToken: Token;
  poolIndex?: number;
}

interface StakeInput {
  amountWei: BigNumber;
}

const useStakeInVault = ({ stakedToken, rewardToken, poolIndex }: UseStakeInVaultInput) => {
  const { mutateAsync: stakeInUcoreVault, isLoading: isStakeInUcoreVaultLoading } = useStakeInUcoreVault({
    stakedToken,
  });

  const { mutateAsync: stakeInUaiVault, isLoading: isStakeInUaiVaultLoading } =
    useStakeInUaiVault();

  const isLoading = isStakeInUcoreVaultLoading || isStakeInUaiVaultLoading;

  const stake = async ({ amountWei }: StakeInput) => {
    if (typeof poolIndex === 'number') {
      return stakeInUcoreVault({
        poolIndex,
        rewardToken,
        amountWei,
      });
    }

    if (areTokensEqual(stakedToken, TOKENS.uai)) {
      return stakeInUaiVault({
        amountWei,
      });
    }

    // This cose should never be reached, but just in case we throw a generic
    // internal error
    throw new VError({
      type: 'unexpected',
      code: 'somethingWentWrong',
    });
  };

  return {
    isLoading,
    stake,
  };
};

export default useStakeInVault;
