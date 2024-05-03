'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import { usePrivy } from '@privy-io/react-auth';
import EmbeddedWalletProvider from '../providers/EmbeddedWalletProvider';

function Profile() {
  const { user, isLoading } = useUser();
  const { ready, authenticated, createWallet, getAccessToken } = usePrivy();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (ready && authenticated) {
        const token = await getAccessToken();
        setAccessToken(token);
      }
    };

    fetchAccessToken();
  }, [ready, authenticated, getAccessToken]);

  console.log("@@@ready=", ready)
  console.log("@@@authenticated=", authenticated)

  return (
    <>
      <EmbeddedWalletProvider>
        {isLoading && <Loading />}
        {user && (
          <>
            <Row
              className="align-items-center profile-header mb-5 text-center text-md-left"
              data-testid="profile"
            >
              <Col md={2}>
                <img
                  src={user.picture}
                  alt="Profile"
                  className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                  decode="async"
                  data-testid="profile-picture"
                />
              </Col>
              <Col md>
                <h2 data-testid="profile-name">{user.name}</h2>
                <p className="lead text-muted" data-testid="profile-email">
                  {user.email}
                </p>
              </Col>
              <button disabled={!(ready && authenticated)} onClick={createWallet}>
                Create a wallet
              </button>
            </Row>
            <Row data-testid="profile-json">
              <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
            </Row>
          </>
        )}
      </EmbeddedWalletProvider>
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>,
});
