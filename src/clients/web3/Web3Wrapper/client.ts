import config from 'config';
import { Chain, configureChains, createClient } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

import { WALLET_CONNECT_PROJECT_ID } from 'constants/walletConnect';

import { CoreWalletConnector } from './coreWalletConnector';

const coreExplorer = {
  name: 'CoreScan',
  url: config.isOnTestnet ? 'https://scan.test.btcs.network' : 'https://scan.coredao.org',
};

export const chain: Chain = {
  id: config.chainId,
  name: config.isOnTestnet ? 'Core Testnet' : 'Core Mainnet',
  network: config.isOnTestnet ? 'core-testnet' : 'core',
  rpcUrls: {
    default: {
      http: [config.rpcUrl],
    },
    public: {
      http: [config.rpcUrl],
    },
  },
  blockExplorers: {
    default: coreExplorer,
    etherscan: coreExplorer,
  },
  nativeCurrency: {
    name: 'Core Token',
    symbol: 'CORE',
    decimals: 18,
  },
};

export const { provider, webSocketProvider } = configureChains(
  [chain], 
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new InjectedConnector({ chains: [chain] }),
    new MetaMaskConnector({ chains: [chain] }),
    new WalletConnectConnector({
      chains: [chain],
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains: [chain],
      options: {
        appName: 'Venus',
      },
    }),
    new CoreWalletConnector({
      chains: [chain],
    })
  ],
  webSocketProvider,
});

export default client;
