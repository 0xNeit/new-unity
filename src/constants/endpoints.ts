import { ChainId } from "./chains";
import { Environment } from 'types';

export const API_ENDPOINT_URLS: Record<Environment, string> = {
  mainnet: 'https://api.venus.io',
  preview: 'https://api-preview.venus.io',
  testnet: 'https://testnetapi.venus.io',
  storybook: 'https://testnetapi.venus.io',
  ci: 'https://testnetapi.venus.io',
};

export const RPC_URLS: {
    [key: string]: string;
  } = {
    [ChainId.CORE_MAINNET]: 'https://rpc.coredao.org',
    [ChainId.CORE_TESTNET]: 'https://rpc.test.btcs.network',
  };