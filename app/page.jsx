'use client';

import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';
import EmbeddedWalletProvider from './providers/EmbeddedWalletProvider';
import {Auth0Provider} from '@auth0/auth0-react';

export default async  function Index() {
  return (
    <>
      <Auth0Provider>
        <EmbeddedWalletProvider>
          <Hero />
          <hr />
          <Content />
        </EmbeddedWalletProvider>
      </Auth0Provider>
    </>
  );
}
