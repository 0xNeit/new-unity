import Web3 from 'web3';
import * as constants from './constants';

// const instance = new Web3(
//   JSON.parse(localStorage.getItem('state')) && JSON.parse(localStorage.getItem('state')).account.setting.walletType === 'binance' ? (process.env.REACT_APP_ENV === 'dev' ? 'https://data-seed-prebsc-1-s1.binance.org:8545' : 'https://bsc-dataseed.binance.org') : window.ethereum
// );

const instance = new Web3(window.ethereum);

const TOKEN_ABI = {
  usdc: constants.CONTRACT_USDC_TOKEN_ABI,
  usdt: constants.CONTRACT_USDT_TOKEN_ABI,
  xvs: constants.CONTRACT_XVS_TOKEN_ABI,
  dai: constants.CONTRACT_DAI_TOKEN_ABI,
  doge: constants.CONTRACT_DOGE_TOKEN_ABI
};

const call = (method: (arg0: any) => { (): any; new(): any; call: { (): Promise<any>; new(): any; }; }, params: any) => {
  return new Promise((resolve, reject) => {
    method(...params)
      .call()
      .then((res: unknown) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const send = (method: (arg0: any) => { (): any; new(): any; send: { (arg0: { from: any; }): Promise<any>; new(): any; }; }, params: any, from: any) => {
  return new Promise((resolve, reject) => {
    method(...params)
      .send({ from })
      .then((res: unknown) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const getVaiTokenContract = () => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_VAI_TOKEN_ABI),
    constants.CONTRACT_VAI_TOKEN_ADDRESS
  );
};

export const getVaiControllerContract = () => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_VAI_CONTROLLER_ABI),
    constants.CONTRACT_VAI_UNITROLLER_ADDRESS
  );
};

export const getVaiVaultContract = () => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_VAI_VAULT_ABI),
    constants.CONTRACT_VAI_VAULT_ADDRESS
  );
};

export const getTokenContract = (name: string | number) => {
  return new instance.eth.Contract(
    JSON.parse(TOKEN_ABI[name]),
    constants.CONTRACT_TOKEN_ADDRESS[name || 'usdc']
      ? constants.CONTRACT_TOKEN_ADDRESS[name || 'usdc'].address
      : constants.CONTRACT_TOKEN_ADDRESS.usdc.address
  );
};

export const getVbepContract = (name: string) => {
  return new instance.eth.Contract(
    JSON.parse(
      name !== 'bnb' ? constants.CONTRACT_VBEP_ABI : constants.CONTRACT_VBNB_ABI
    ),
    constants.CONTRACT_VBEP_ADDRESS[name || 'usdc']
      ? constants.CONTRACT_VBEP_ADDRESS[name || 'usdc'].address
      : constants.CONTRACT_VBEP_ADDRESS.usdc.address
  );
};

export const getComptrollerContract = () => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_COMPTROLLER_ABI),
    constants.CONTRACT_COMPTROLLER_ADDRESS
  );
};

export const getPriceOracleContract = (
  address = constants.CONTRACT_PRICE_ORACLE_ADDRESS
) => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_PRICE_ORACLE_ABI),
    address
  );
};

export const getVoteContract = () => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_VOTE_ABI),
    constants.CONTRACT_VOTE_ADDRESS
  );
};

export const getInterestModelContract = (address: string | undefined) => {
  return new instance.eth.Contract(
    JSON.parse(constants.CONTRACT_INTEREST_MODEL_ABI),
    address
  );
};

export const methods = {
  call,
  send
};
