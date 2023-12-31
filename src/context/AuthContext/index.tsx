import { openInfinityWallet } from '@infinitywallet/infinity-connector';
import type { Provider } from '@wagmi/core';
import config from '../../config';
import { VError } from '../../errors';
import { Signer, getDefaultProvider } from 'ethers';
import noop from 'noop-ts';
import React, { useCallback, useContext, useEffect } from 'react';
import {
  ConnectorNotFoundError,
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';

// import useGetIsAddressAuthorized from 'clients/api/queries/getIsAddressAuthorized/useGetIsAddressAuthorized';
import { Connector, connectorIdByName } from '../../clients/web3';
import { AuthModal } from '../../components/AuthModal';
import { logError } from '../ErrorLogger';
import { isRunningInInfinityWalletApp } from '../../utils/walletDetection';

export interface AuthContextValue {
  login: (connector: Connector) => Promise<void>;
  logOut: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  provider: Provider;
  accountAddress: string;
  signer?: Signer;
}

export const AuthContext = React.createContext<AuthContextValue>({
  login: noop,
  logOut: noop,
  openAuthModal: noop,
  closeAuthModal: noop,
  provider: getDefaultProvider(),
  accountAddress: '',
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { connectors, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  /*const { data: accountAuth } = useGetIsAddressAuthorized(address || '', {
    enabled: address !== undefined,
  });*/

  // Set address as authorized by default
  // const isAuthorizedAddress = !accountAuth || accountAuth.authorized;
  const accountAddress = isConnected && !!signer && address ? address : '';

  const login = useCallback(async (connectorId: Connector) => {
    // If user is attempting to connect their Infinity wallet but the dApp
    // isn't currently running in the Infinity Wallet app, open it
    if (connectorId === Connector.InfinityWallet && !isRunningInInfinityWalletApp()) {
      openInfinityWallet(window.location.href, config.chainId);
      return;
    }

    const connector =
      connectors.find(item => item.id === connectorIdByName[connectorId]) || connectors[0];

    try {
      // Log user in
      await connectAsync({ connector, chainId: config.chainId });
    } catch (error) {
      if (error instanceof ConnectorNotFoundError) {
        throw new VError({ type: 'interaction', code: 'noProvider' });
      } else {
        logError(error);
      }
    }
  }, []);

  const logOut = useCallback(async () => {
    await disconnectAsync();
  }, []);

  // Disconnect wallet if it's connected to the wrong network. Note: ideally
  // we'd instead switch the network automatically, but this seems to cause
  // issues with certain wallets such as MetaMask
  useEffect(() => {
    const fn = async () => {
      if (!!accountAddress && chain && chain.id !== config.chainId) {
        await logOut();
      }
    };

    fn();
  }, [chain?.id, accountAddress]);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleLogin = async (connector: Connector) => {
    await login(connector);
    closeAuthModal();
  };

  return (
    <AuthContext.Provider
      value={{
        accountAddress,
        login,
        logOut,
        openAuthModal,
        closeAuthModal,
        provider,
        signer: signer || undefined,
      }}
    >
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        accountAddress={accountAddress}
        onLogOut={logOut}
        onLogin={handleLogin}
      />

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
