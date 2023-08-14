import config from 'config';
import { Token, TokenAction } from 'types';

// import { MAINNET_TOKENS, TESTNET_TOKENS } from 'constants/tokens';

interface DisabledToken {
  token: Token;
  disabledActions: TokenAction[];
}

export const DISABLED_TOKENS_TESTNET: DisabledToken[] = [];

export const DISABLED_TOKENS_MAINNET: DisabledToken[] = [];

export const DISABLED_TOKENS = config.isOnTestnet
  ? DISABLED_TOKENS_TESTNET
  : DISABLED_TOKENS_MAINNET;
