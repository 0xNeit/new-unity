import { ChainId } from "./chains";

export const BLOCK_TIME_MS = 3000;
// 20 blocks a minute, 60 minutes an hour, 24 hours a day
export const BLOCKS_PER_DAY = (60 / (BLOCK_TIME_MS / 1000)) * 60 * 24;

export const CORE_SCAN_URLS = {
  [ChainId.CORE_MAINNET]: 'https://scan.coredao.org',
  [ChainId.CORE_TESTNET]: 'https://scan.test.btcs.network',
};