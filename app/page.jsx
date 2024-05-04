'use client';

import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';
import EmbeddedWalletProvider from './providers/EmbeddedWalletProvider';

export default async  function Index() {
  return (
    <>
      <EmbeddedWalletProvider>
        <Hero />
        <hr />
        <Content />
      </EmbeddedWalletProvider>
    </>
  );
}
