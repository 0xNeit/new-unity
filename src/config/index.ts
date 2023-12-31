import { ChainId } from '../constants/chains';
import { Environment } from '../types';

import { CORE_SCAN_URLS } from '../constants/core';
import { API_ENDPOINT_URLS, RPC_URLS } from '../constants/endpoints';

// import { MAINNET_SUBGRAPH_URL, TESTNET_SUBGRAPH_URL } from './codegen';*/

export interface Config {
  environment: Environment;
  chainId: ChainId;
  isOnTestnet: boolean;
  rpcUrl: string;
  apiUrl: string;
  // subgraphUrl: string;
  coreScanUrl: string;
  sentryDsn: string;
  posthog: {
    apiKey: string;
    hostUrl: string;
  };
}

// Note: because Vite statically replaces env variables when building, we need
// to reference each of them by their full name
export const ENV_VARIABLES = {
  NODE_ENV: typeof process !== 'undefined' ? process.env.NODE_ENV : undefined,
  VITE_ENVIRONMENT:
    typeof process !== 'undefined'
      ? process.env.VITE_ENVIRONMENT
      : import.meta.env.VITE_ENVIRONMENT,
  VITE_RPC_URL_MAINNET:
    typeof process !== 'undefined'
      ? process.env.VITE_RPC_URL_MAINNET
      : import.meta.env.VITE_RPC_URL_MAINNET,
  VITE_RPC_URL_TESTNET:
    typeof process !== 'undefined'
      ? process.env.VITE_RPC_URL_TESTNET
      : import.meta.env.VITE_RPC_URL_TESTNET,

  // Third-parties
  VITE_SENTRY_DSN:
    typeof process !== 'undefined' ? process.env.VITE_SENTRY_DSN : import.meta.env.VITE_SENTRY_DSN,
  VITE_POSTHOG_API_KEY:
    typeof process !== 'undefined'
      ? process.env.VITE_POSTHOG_API_KEY
      : import.meta.env.VITE_POSTHOG_API_KEY,
  VITE_POSTHOG_HOST_URL:
    typeof process !== 'undefined'
      ? process.env.VITE_POSTHOG_HOST_URL
      : import.meta.env.VITE_POSTHOG_HOST_URL,

  // Feature flags
  VITE_FF_ISOLATED_POOLS:
    typeof process !== 'undefined'
      ? process.env.VITE_FF_ISOLATED_POOLS
      : import.meta.env.VITE_FF_ISOLATED_POOLS,
  VITE_FF_INTEGRATED_SWAP:
    typeof process !== 'undefined'
      ? process.env.VITE_FF_INTEGRATED_SWAP
      : import.meta.env.VITE_FF_INTEGRATED_SWAP,
};

const environment: Environment =
  (ENV_VARIABLES.VITE_ENVIRONMENT as Environment | undefined) || 'mainnet';

const isLocalServer = import.meta.env.DEV && environment !== 'ci' && environment !== 'storybook';

const isOnTestnet =
  environment === 'testnet' || environment === 'storybook' || environment === 'ci';

const chainId = isOnTestnet ? ChainId.CORE_TESTNET : ChainId.CORE_MAINNET;

const localRpcUrl =
  environment === 'mainnet' || environment === 'preview'
    ? ENV_VARIABLES.VITE_RPC_URL_MAINNET
    : ENV_VARIABLES.VITE_RPC_URL_TESTNET;

const rpcUrl = isLocalServer ? localRpcUrl : RPC_URLS[chainId];
const apiUrl = API_ENDPOINT_URLS[environment];
const coreScanUrl = CORE_SCAN_URLS[chainId];
// const subgraphUrl = isOnTestnet ? TESTNET_SUBGRAPH_URL : MAINNET_SUBGRAPH_URL;

const config: Config = {
  environment,
  chainId,
  isOnTestnet,
  rpcUrl,
  apiUrl,
  // subgraphUrl,
  coreScanUrl,
  sentryDsn: ENV_VARIABLES.VITE_SENTRY_DSN || '',
  posthog: {
    apiKey: ENV_VARIABLES.VITE_POSTHOG_API_KEY || '',
    hostUrl: ENV_VARIABLES.VITE_POSTHOG_HOST_URL || '',
  },
};

export default config;
