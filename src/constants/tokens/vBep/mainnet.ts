import { VToken } from 'types';

import { MAINNET_TOKENS } from '../common/mainnet';

export const MAINNET_VBEP_TOKENS = {
  // Main pool
  '0xeca88125a5adbe82614ffc12d0db554e2e2867c8': {
    address: '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8',
    decimals: 8,
    symbol: 'vUSDC',
    underlyingToken: MAINNET_TOKENS.usdc,
  } as VToken,
  '0xfd5840cd36d94d7229439859c0112a4185bc0255': {
    address: '0xfD5840Cd36d94D7229439859C0112a4185BC0255',
    decimals: 8,
    symbol: 'vUSDT',
    underlyingToken: MAINNET_TOKENS.usdt,
  } as VToken,
  '0x95c78222b3d6e262426483d42cfa53685a67ab9d': {
    address: '0x95c78222B3D6e262426483D42CfA53685A67Ab9D',
    decimals: 8,
    symbol: 'vBUSD',
    underlyingToken: MAINNET_TOKENS.busd,
  } as VToken,
  '0xa07c5b74c9b40447a954e1466938b865b6bbea36': {
    address: '0xA07c5b74C9B40447a954e1466938b865b6BBea36',
    decimals: 8,
    symbol: 'vBNB',
    underlyingToken: MAINNET_TOKENS.bnb,
  } as VToken,
  '0xf508fcd89b8bd15579dc79a6827cb4686a3592c8': {
    address: '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8',
    decimals: 8,
    symbol: 'vETH',
    underlyingToken: MAINNET_TOKENS.eth,
  } as VToken,
  '0x334b3ecb4dca3593bccc3c7ebd1a1c1d1780fbf1': {
    address: '0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1',
    decimals: 8,
    symbol: 'vDAI',
    underlyingToken: MAINNET_TOKENS.dai,
  } as VToken,
  '0xec3422ef92b2fb59e84c8b02ba73f1fe84ed8d71': {
    address: '0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71',
    decimals: 8,
    symbol: 'vDOGE',
    underlyingToken: MAINNET_TOKENS.doge,
  } as VToken,

};
