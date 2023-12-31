// Copied from https://github.com/pancakeswap/pancake-frontend
import { hexValue } from '@ethersproject/bytes';
import type { Ethereum } from '@wagmi/core';
import {
  Chain,
  ConnectorNotFoundError,
  ResourceUnavailableError,
  RpcError,
  SwitchChainNotSupportedError,
  UserRejectedRequestError,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

declare global {
  interface Window {
    CoreChain?: {
      coreSign?: (
        address: string,
        message: string,
      ) => Promise<{ publicKey: string; signature: string }>;
      switchNetwork?: (networkId: string) => Promise<string>;
    } & Ethereum;
  }
}

const mappingNetwork: Record<number, string> = {
  1116: 'core-mainnet',
  1115: 'core-testnet',
};

const coreChainListener = async () =>
  new Promise<void>(resolve =>
    Object.defineProperty(window, 'CoreChain', {
      get() {
        return this.core;
      },
      set(core) {
        this.core = core;

        resolve();
      },
    }),
  );

export class CoreWalletConnector extends InjectedConnector {
  readonly id = 'core';

  readonly ready = typeof window !== 'undefined';

  provider?: Window['CoreChain'];

  constructor({
    chains: _chains,
  }: {
    chains?: Chain[];
  } = {}) {
    const options = {
      name: 'Core',
      shimDisconnect: false,
      shimChainChangedDisconnect: true,
    };
    const chains = _chains?.filter(c => !!mappingNetwork[c.id]);
    super({
      chains,
      options,
    });
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider();
      if (!provider) {
        throw new ConnectorNotFoundError();
      }

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
        provider.on('disconnect', this.onDisconnect);
      }

      this.emit('message', { type: 'connecting' });

      const account = await this.getAccount();
      // Switch to chain if provided
      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        ({ id } = chain);
        unsupported = this.isChainUnsupported(id);
      }

      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error);
      }

      if ((error as RpcError).code === -32002) {
        throw new ResourceUnavailableError(error);
      }

      throw error;
    }
  }

  async getProvider() {
    if (typeof window !== 'undefined') {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=
      if (window.CoreChain) {
        this.provider = window.CoreChain;
      } else {
        await coreChainListener();
        this.provider = window.CoreChain;
      }
    }
    return this.provider;
  }

  async switchChain(chainId: number): Promise<Chain> {
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();

    const id = hexValue(chainId);

    if (mappingNetwork[chainId]) {
      try {
        await provider.switchNetwork?.(mappingNetwork[chainId]);

        return (
          this.chains.find(x => x.id === chainId) || {
            id: chainId,
            name: `Chain ${id}`,
            network: `${id}`,
            nativeCurrency: { decimals: 18, name: 'Core', symbol: 'CORE' },
            rpcUrls: {
              default: {
                http: [''],
              },
              public: {
                http: [''],
              },
            },
          }
        );
      } catch (error) {
        if ((error as any).error === 'user rejected') {
          throw new UserRejectedRequestError(error);
        }
      }
    }
    throw new SwitchChainNotSupportedError({ connector: this });
  }
}
