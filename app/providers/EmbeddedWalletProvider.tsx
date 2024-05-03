'use client';
import {PrivyProvider} from '@privy-io/react-auth';
import {useMemo, type PropsWithChildren, useCallback} from 'react';
import {useAuth0} from '@auth0/auth0-react';
type Props = PropsWithChildren<{}>;

const EmbeddedWalletProvider: React.FC<Props> = ({ children }) => {
  
  // Get auth details from Auth0
  const {getAccessTokenSilently, isLoading, isAuthenticated} = useAuth0();

  // Wrap getAccessTokenSilently as necessary (explained below)
  const getCustomToken = useCallback(
    () => getAccessTokenSilently(),
    [isAuthenticated, getAccessTokenSilently],
  );

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        },
        customAuth: {
          isLoading: false,
          getCustomAccessToken: getCustomToken,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default EmbeddedWalletProvider;
