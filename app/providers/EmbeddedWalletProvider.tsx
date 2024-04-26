'use client';
import { getToken } from '../utils/getToken';
import {PrivyProvider} from '@privy-io/react-auth';
import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<{}>;

const EmbeddedWalletProvider: React.FC<Props> = ({ children }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        },
        customAuth: {
          isLoading: false,
          getCustomAccessToken: getToken,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default EmbeddedWalletProvider;
