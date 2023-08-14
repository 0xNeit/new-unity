import { Token } from 'types';

import bnb from 'assets/img/tokens/bnb.svg';
import busd from 'assets/img/tokens/busd.svg';
import dai from 'assets/img/tokens/dai.svg';
import doge from 'assets/img/tokens/doge.svg';
import eth from 'assets/img/tokens/eth.svg';
import usdc from 'assets/img/tokens/usdc.svg';
import usdt from 'assets/img/tokens/usdt.svg';
import uai from 'assets/img/tokens/uai.svg';
import urt from 'assets/img/tokens/urt.svg';
import ucore from 'assets/img/tokens/ucore.svg';
import core from 'assets/img/tokens/core.png';

export const MAINNET_TOKENS = {
  core: {
    address: '',
    decimals: 18,
    symbol: 'CORE',
    asset: core,
    isNative: true,
  } as Token,
  usdc: {
    address: '0xD2683b22287E63D22928CBe4514003a92507f474',
    decimals: 18,
    symbol: 'USDC',
    asset: usdc,
  } as Token,
  usdt: {
    address: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
    decimals: 18,
    symbol: 'USDT',
    asset: usdt,
  } as Token,
  busd: {
    address: '0x8687cD1d02A28098571067ddB18F33fEF667C929',
    decimals: 18,
    symbol: 'BUSD',
    asset: busd,
  } as Token,
  ucore: {
    address: '0x821A1C06F2C9aAF9Eb4b80A2A7881ae69595Cb10',
    decimals: 18,
    symbol: 'UCORE',
    asset: ucore,
  } as Token,
  eth: {
    address: '0xeF6b7BC74C9354BCf2e3F2A068e4b0B5CDf08F29',
    decimals: 18,
    symbol: 'ETH',
    asset: eth,
  } as Token,
  dai: {
    address: '0x1f82d787a1186c67360E62869C46eADbc192846a',
    decimals: 18,
    symbol: 'DAI',
    asset: dai,
  } as Token,
  uai: {
    address: '0x2f81F14b63b8598d6Fc21f72be24aD6061E29b58',
    decimals: 18,
    symbol: 'UAI',
    asset: uai,
  } as Token,
  urt: {
    address: '0xd101a592AAd3B38b0546a308d4D761c5d5b1b4F3',
    decimals: 18,
    symbol: 'URT',
    asset: urt,
  } as Token,
  bnb: {
    address: '0x12AA82525DEfF84777fa78578A68ceB854A85f43',
    decimals: 18,
    symbol: 'BNB',
    asset: bnb,
  } as Token,
  doge: {
    address: '0x7de0Bc2cf736f0a307299A0acFf1e89843C109a2',
    decimals: 18,
    symbol: 'DOGE',
    asset: doge,
  } as Token,
  wcore: {
    address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
    decimals: 18,
    symbol: 'WCORE',
    asset: core,
  } as Token,
};
