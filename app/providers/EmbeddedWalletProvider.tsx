'use client';
import { getToken } from '../utils/getToken';
import { PrivyProvider } from '@privy-io/react-auth';
import { PropsWithChildren } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

type Props = PropsWithChildren<{}>;

const EmbeddedWalletProvider: React.FC<Props> = ({ children }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        customAuth: {
          isLoading: false,
          getCustomAccessToken: getToken,
        },
      }}
    >
      <WalletComponent>{children}</WalletComponent>
    </PrivyProvider>
  );
};

const WalletComponent: React.FC<Props> = ({ children }) => {
  const { ready, wallets } = useWallets();
  console.log("@@@wallets=", wallets);
  console.log("@@@ready=", ready);

  return <>{children}</>;
};

export default EmbeddedWalletProvider;
