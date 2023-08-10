import { ChainId } from "./chains";

export const RPC_URLS: {
    [key: string]: string;
  } = {
    [ChainId.CORE_MAINNET]: 'https://rpc.coredao.org',
    [ChainId.CORE_TESTNET]: 'https://rpc.test.btcs.network',
  };