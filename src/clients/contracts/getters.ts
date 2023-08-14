// import { abi as poolLensAbi } from '@venusprotocol/isolated-pools/artifacts/contracts/Lens/PoolLens.sol/PoolLens.json';
import { Contract, ContractInterface, Signer } from 'ethers';
import { Token, VToken } from 'types';
import { areTokensEqual, getContractAddress, /* getSwapRouterContractAddress */ } from 'utils';

import { chain, provider } from 'clients/web3';
import bep20Abi from 'constants/contracts/abis/bep20.json';
import comptrollerAbi from 'constants/contracts/abis/comptroller.json';
import governorBravoDelegateAbi from 'constants/contracts/abis/governorBravoDelegate.json';
import maximillionAbi from 'constants/contracts/abis/maximillion.json';
import swapRouterAbi from 'constants/contracts/abis/swapRouter.json';
import vBep20Abi from 'constants/contracts/abis/vBep20.json';
import vCoreTokenAbi from 'constants/contracts/abis/vCoreToken.json';
import uaiTokenAbi from 'constants/contracts/abis/uaiToken.json';
import uaiVaultAbi from 'constants/contracts/abis/uaiVault.json';
import urtConverterAbi from 'constants/contracts/abis/urtConverter.json';
import urtTokenAbi from 'constants/contracts/abis/urtToken.json';
import ucoreTokenAbi from 'constants/contracts/abis/ucoreToken.json';
import ucoreVaultAbi from 'constants/contracts/abis/ucoreVault.json';
import ucoreVaultStoreAbi from 'constants/contracts/abis/ucoreVaultStore.json';
import { TOKENS } from 'constants/tokens';
import {
  Comptroller,
  GovernorBravoDelegate,
  Maximillion,
  // PoolLens,
  SwapRouter,
  UaiVault,
  UrtConverter,
  UcoreVault,
  UcoreVaultStore,
} from 'types/contracts';

import { TokenContract, VTokenContract } from './types';

export const getContract = ({
  abi,
  address,
  signer,
}: {
  abi: ContractInterface;
  address: string;
  signer?: Signer;
}) => {
  const signerOrProvider = signer ?? provider({ chainId: chain.id });
  return new Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (token: Token, signer?: Signer) => {
  if (areTokensEqual(token, TOKENS.ucore)) {
    return getContract({
      abi: ucoreTokenAbi,
      address: token.address,
      signer,
    }) as TokenContract<'ucore'>;
  }

  if (areTokensEqual(token, TOKENS.uai)) {
    return getContract({
      abi: uaiTokenAbi,
      address: token.address,
      signer,
    }) as TokenContract<'uai'>;
  }

  if (areTokensEqual(token, TOKENS.urt)) {
    return getContract({
      abi: urtTokenAbi,
      address: token.address,
      signer,
    }) as TokenContract<'urt'>;
  }

  return getContract({
    abi: bep20Abi,
    address: token.address,
    signer,
  }) as TokenContract;
};

export const getVTokenContract = (vToken: VToken, signer?: Signer) => {
  if (vToken.symbol === 'vCORE') {
    return getContract({
      abi: vCoreTokenAbi,
      address: vToken.address,
      signer,
    }) as VTokenContract<'core'>;
  }

  return getContract({
    abi: vBep20Abi,
    address: vToken.address,
    signer,
  }) as VTokenContract;
};

export const getUaiVaultContract = (signer?: Signer) =>
  getContract({
    abi: uaiVaultAbi,
    address: getContractAddress('uaiVault'),
    signer,
  }) as UaiVault;

export const getUcoreVaultProxyContract = (signer?: Signer) =>
  getContract({
    abi: ucoreVaultAbi,
    address: getContractAddress('ucoreVaultProxy'),
    signer,
  }) as UcoreVault;

export const getUcoreVaultStoreContract = (signer?: Signer) =>
  getContract({
    abi: ucoreVaultStoreAbi,
    address: getContractAddress('ucoreVaultStore'),
    signer,
  }) as UcoreVaultStore;

export const getComptrollerContract = (address: string, signer?: Signer) =>
  getContract({
    abi: comptrollerAbi,
    address,
    signer,
  }) as Comptroller;

export const getGovernorBravoDelegateContract = (signer?: Signer) =>
  getContract({
    abi: governorBravoDelegateAbi,
    address: getContractAddress('governorBravoDelegator'),
    signer,
  }) as GovernorBravoDelegate;

export const getMaximillionContract = (signer?: Signer) =>
  getContract({
    abi: maximillionAbi,
    address: getContractAddress('maximillion'),
    signer,
  }) as Maximillion;

export const getUrtConverterProxyContract = (signer?: Signer) =>
  getContract({
    abi: urtConverterAbi,
    address: getContractAddress('urtConverterProxy'),
    signer,
  }) as UrtConverter;

// Swap router
/* export const getSwapRouterContract = (poolComptrollerAddress: string, signer?: Signer) => {
  const swapRouterAddress = getSwapRouterContractAddress(poolComptrollerAddress);

  return getContract({
    abi: swapRouterAbi,
    address: swapRouterAddress,
    signer,
  }) as SwapRouter;
}; */

/* export const getPoolLensContract = (signer?: Signer) =>
  getContract({
    abi: poolLensAbi,
    address: getContractAddress('PoolLens'),
    signer,
  }) as PoolLens; */
