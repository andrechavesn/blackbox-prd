import { AppProps } from 'next/app';
import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { globalStyles } from '../../shared/styles';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../contexts/AuthContext';

const cache = createCache({ key: 'next' });

function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <AuthProvider>
        {globalStyles}
        <ToastContainer autoClose={5000} />
        <Component {...pageProps} />
      </AuthProvider>
    </CacheProvider>
  );
}

export default App;
