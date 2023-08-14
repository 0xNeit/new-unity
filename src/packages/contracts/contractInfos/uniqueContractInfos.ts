import type { JsonFragment } from '@ethersproject/abi';
// import { abi as poolLensAbi } from '@venusprotocol/isolated-pools/artifacts/contracts/Lens/PoolLens.sol/PoolLens.json';
// import isolatedPoolsMainnetDeployments from '@venusprotocol/isolated-pools/deployments/bscmainnet.json';
// import isolatedPoolsTestnetDeployments from '@venusprotocol/isolated-pools/deployments/bsctestnet.json';
import { abi as mainPoolComptrollerAbi } from 'unity-core-contracts/artifacts/contracts/Controller/Controller.sol/Controller.json';
import { abi as governorBravoDelegatorAbi } from 'unity-core-contracts/artifacts/contracts/Governance/GovernorBravoDelegator.sol/GovernorBravoDelegator.json';
import { abi as ucoreLensAbi } from 'unity-core-contracts/artifacts/contracts/Lens/UcoreLens.sol/UcoreLens.json';
import { abi as uaiControllerAbi } from 'unity-core-contracts/artifacts/contracts/Tokens/UAI/UAIController.sol/UAIController.json';
import { abi as urtConverterAbi } from 'unity-core-contracts/artifacts/contracts/Tokens/URT/URTConverter.sol/URTConverter.json';
import { abi as ucoreVestingAbi } from 'unity-core-contracts/artifacts/contracts/Tokens/UCORE/UCOREVesting.sol/UCOREVesting.json';
import { abi as uaiVaultAbi } from 'unity-core-contracts/artifacts/contracts/Vault/UAIVault.sol/UAIVault.json';
import { abi as ucoreVaultAbi } from 'unity-core-contracts/artifacts/contracts/UCOREVault/UCOREVault.sol/UCOREVault.json';

// import { PoolLens } from '../types/contracts/isolatedPools';
import { Maximillion, Multicall } from '../types/contracts/others';
import {
  GovernorBravoDelegator,
  Controller as MainPoolComptroller,
  UAIController,
  UAIVault,
  URTConverter,
  UcoreLens,
  UCOREVault,
} from '../types/contracts/unityProtocol';
import { UCOREVesting } from '../types/contracts/ucoreVesting';

import { ChainId } from '../types';
import maximillionAbi from './externalAbis/maximillion.json';
import multicallAbi from './externalAbis/multicall.json';

export interface UniqueContractInfo {
  abi: JsonFragment[];
  address: Partial<{
    [chainId in ChainId]: string;
  }>;
}

const ucoreLens: UniqueContractInfo = {
  abi: ucoreLensAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0x498359dD75a1d129FDc3E1f55cc5258920D3ab24",
    [ChainId.CORE_MAINNET]: "0x498359dD75a1d129FDc3E1f55cc5258920D3ab24",
  },
};

/*const poolLens: UniqueContractInfo = {
  abi: poolLensAbi,
  address: {
    [ChainId.CORE_TESTNET]: isolatedPoolsMainnetDeployments.contracts.PoolLens.address,
    [ChainId.CORE_MAINNET]: isolatedPoolsTestnetDeployments.contracts.PoolLens.address,
  },
};*/

const mainPoolComptroller: UniqueContractInfo = {
  abi: mainPoolComptrollerAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0xE020E0Df54c48B97A3E080Abe0F9C76E4869a84F",
    [ChainId.CORE_MAINNET]: "0xE020E0Df54c48B97A3E080Abe0F9C76E4869a84F",
  },
};

const uaiController: UniqueContractInfo = {
  abi: uaiControllerAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0x1898BecA2cE07A4B8eB20432011e8D4295D3670a",
    [ChainId.CORE_MAINNET]: "0x1898BecA2cE07A4B8eB20432011e8D4295D3670a",
  },
};

const uaiVault: UniqueContractInfo = {
  abi: uaiVaultAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0x1E47c6c475fF4c2A9bbc8fC030fe5084E817F924",
    [ChainId.CORE_MAINNET]: "0x1E47c6c475fF4c2A9bbc8fC030fe5084E817F924",
  },
};

const ucoreVault: UniqueContractInfo = {
  abi: ucoreVaultAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0x56434Fa0A156eCa1CD193e4EB280f715F272bFcb",
    [ChainId.CORE_MAINNET]: "0x56434Fa0A156eCa1CD193e4EB280f715F272bFcb",
  },
};

const governorBravoDelegator: UniqueContractInfo = {
  abi: governorBravoDelegatorAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0xd4D414A1372FCB01Fd646219637bb8F6FB217c69",
    [ChainId.CORE_MAINNET]: "0xd4D414A1372FCB01Fd646219637bb8F6FB217c69",
  },
};

const ucoreVesting: UniqueContractInfo = {
  abi: ucoreVestingAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0xeF61fb1E75a35Bc38eF9fB8dB96a7d00bcCd806C",
    [ChainId.CORE_MAINNET]: "0xeF61fb1E75a35Bc38eF9fB8dB96a7d00bcCd806C",
  },
};

const urtConverter: UniqueContractInfo = {
  abi: urtConverterAbi,
  address: {
    [ChainId.CORE_TESTNET]: "0xBe3c4B95aF825e96bffe01Cd7898BE9fD7C88b39",
    [ChainId.CORE_MAINNET]: "0xBe3c4B95aF825e96bffe01Cd7898BE9fD7C88b39",
  },
};

const maximillion: UniqueContractInfo = {
  abi: maximillionAbi,
  address: {
    [ChainId.CORE_TESTNET]: '0x98f4dBC9a5b5CeB8a8c75d71F8a86886323fE1C3',
    [ChainId.CORE_MAINNET]: '0x98f4dBC9a5b5CeB8a8c75d71F8a86886323fE1C3',
  },
};

const multicall: UniqueContractInfo = {
  abi: multicallAbi,
  address: {
    [ChainId.CORE_TESTNET]: '0xb2D88103dd6DF8930f98737DF273C74D7bD4d182',
    [ChainId.CORE_MAINNET]: '0xb2D88103dd6DF8930f98737DF273C74D7bD4d182',
  },
};

const uniqueContractInfos = {
  ucoreLens,
  // poolLens,
  mainPoolComptroller,
  uaiController,
  uaiVault,
  ucoreVault,
  ucoreVesting,
  governorBravoDelegator,
  urtConverter,
  maximillion,
  multicall,
};

export type UniqueContractName = keyof typeof uniqueContractInfos;

export type UniqueContractTypes = {
  ucoreLens: UcoreLens;
  // poolLens: PoolLens;
  mainPoolComptroller: MainPoolComptroller;
  uaiController: UAIController;
  uaiVault: UAIVault;
  ucoreVault: UCOREVault;
  ucoreVesting: UCOREVesting;
  governorBravoDelegator: GovernorBravoDelegator;
  urtConverter: URTConverter;
  maximillion: Maximillion;
  multicall: Multicall;
};

export type UniqueContractTypeByName<TContractName extends UniqueContractName> =
  UniqueContractTypes[TContractName];

export default uniqueContractInfos;
