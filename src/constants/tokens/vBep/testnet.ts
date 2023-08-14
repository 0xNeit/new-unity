import { VToken } from 'types';

import { TESTNET_TOKENS } from '../common/testnet';

export const TESTNET_VBEP_TOKENS = {
  // Main pool
  '0xd5c4c2e2facbeb59d0216d0595d63fcdc6f9a1a7': {
    address: '0xD5C4C2e2facBEB59D0216D0595d63FcDc6F9A1a7',
    decimals: 8,
    symbol: 'vUSDC',
    underlyingToken: TESTNET_TOKENS.usdc,
  } as VToken,
  '0xb7526572ffe56ab9d7489838bf2e18e3323b441a': {
    address: '0xb7526572FFE56AB9D7489838Bf2E18e3323b441A',
    decimals: 8,
    symbol: 'vUSDT',
    underlyingToken: TESTNET_TOKENS.usdt,
  } as VToken,
  '0x08e0a5575de71037ae36abfafb516595fe68e5e4': {
    address: '0x08e0A5575De71037aE36AbfAfb516595fE68e5e4',
    decimals: 8,
    symbol: 'vBUSD',
    underlyingToken: TESTNET_TOKENS.busd,
  } as VToken,
  '0x2e7222e51c0f6e98610a1543aa3836e092cde62c': {
    address: '0x2E7222e51c0f6e98610A1543Aa3836E092CDe62c',
    decimals: 8,
    symbol: 'vBNB',
    underlyingToken: TESTNET_TOKENS.bnb,
  } as VToken,
  '0x162d005f0fff510e54958cfc5cf32a3180a84aab': {
    address: '0x162D005F0Fff510E54958Cfc5CF32A3180A84aab',
    decimals: 8,
    symbol: 'vETH',
    underlyingToken: TESTNET_TOKENS.eth,
  } as VToken,
  '0xf912d3001caf6dc4add366a62cc9115b4303c9a9': {
    address: '0xF912d3001CAf6DC4ADD366A62Cc9115B4303c9A9',
    decimals: 8,
    symbol: 'vDOGE',
    underlyingToken: TESTNET_TOKENS.doge,
  } as VToken,
};
