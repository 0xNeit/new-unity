import { Bep20, VBep20, VCoreToken, UaiToken, UrtToken, UcoreToken } from 'types/contracts';

export type TokenContract<T extends string = ''> = T extends 'ucore'
  ? UcoreToken
  : T extends 'uai'
  ? UaiToken
  : T extends 'urt'
  ? UrtToken
  : Bep20;

export type VTokenContract<T extends string | undefined = undefined> = T extends 'core'
  ? VCoreToken
  : VBep20;
