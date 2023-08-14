import { MAINNET_TOKENS } from '../common/mainnet';
import { MAINNET_ICECREAMSWAP_TOKENS } from './mainnetSwapTokens';

export const MAINNET_SWAP_TOKENS = {
  ...MAINNET_ICECREAMSWAP_TOKENS,
  ...MAINNET_TOKENS,
};
