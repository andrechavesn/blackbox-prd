import { AppProps } from 'next/app';
import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { globalStyles } from '../../shared/styles';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../contexts/AuthContext';
import { ChannelProvider } from '../contexts/ChannelContext';
import { Sidebar } from '../components/Sidebar';

const cache = createCache({ key: 'next' });

const INITIAL_PAGES = ['/'];

function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <CacheProvider value={cache}>
      <AuthProvider>
        <ChannelProvider>
          {globalStyles}
          <ToastContainer autoClose={5000} />
          {INITIAL_PAGES.includes(asPath) ? (
            <Component {...pageProps} />
          ) : (
            <Sidebar>
              <Component {...pageProps} />
            </Sidebar>
          )}
        </ChannelProvider>
      </AuthProvider>
    </CacheProvider>
  );
}

export default App;
