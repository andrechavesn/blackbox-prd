/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import axios from 'axios';

import Router from 'next/router';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { api } from '../services/api/api';

type Account = JwtProps;

type JwtProps = {
  exp: number;
  iat: number;
  nbf: number;
  id: string;
  username: string;
  primarygroupsid: string;
};

type ISignInData = {
  username: string;
  password: string;
};

type ChannelProps = {
  value: [
    {
      id: string;
      name: string;
      url: string;
    },
  ];
};

interface AuthContextData {
  signIn: (credentials: ISignInData) => void;
  signOut: () => Promise<void>;
  channels: ChannelProps;
  isAuthenticated: boolean;
  account: Account;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [loggedAccount, setLoggedAccount] = useState<Account>();
  const [channels, setChannels] = useState<ChannelProps>();
  const isAuthenticated = !!loggedAccount;

  const signOut = useCallback(async () => {
    try {
      destroyCookie(undefined, 'blackbox.token');

      authChannel.postMessage('signOut');

      await Router.push('/');
    } catch (err) {
      toast.error('Error while signing out');
    }
  }, []);

  useEffect(() => {
    try {
      authChannel = new BroadcastChannel('auth');

      authChannel.onmessage = message => {
        switch (message.data) {
          case 'signOut':
            signOut();
            authChannel.close();
            break;
          default:
            break;
        }
      };
    } catch (err) {
      authChannel.close();
    }
  }, [signOut]);

  const handleAuth = useCallback((token: any) => {
    if (token) {
      const config = {
        method: 'get',
        url: 'https://www.black-box.uk/api/Channel/all',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(async response => {
          const value = await response.data;

          setChannels(value);
        })
        .catch(error => {
          if (error) {
            toast.error('Error loading channels');
          }
        });
    } else {
      signOut();
    }
  }, []);

  useEffect(() => {
    const { 'blackbox.token': token } = parseCookies();

    if (token) {
      const account: JwtProps = jwtDecode(token);

      setLoggedAccount(account);
    } else {
      setLoggedAccount(undefined);
      signOut();
    }
  }, []);

  const signIn = useCallback(
    ({ username, password }: ISignInData) => {
      try {
        api
          .post(
            '/Account/login',
            {
              username,
              password,
            },
            {
              headers: {
                'request-method': 'POST',
              },
            },
          )

          .then(async response => {
            const { token, expires_in } = await response.data;

            setCookie(undefined, 'blackbox.token', token, {
              maxAge: expires_in, // 30 days
              path: '/',
            });

            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            const account: JwtProps = await jwtDecode(token);

            handleAuth(token);

            setLoggedAccount(account);

            toast.success('Successful login! 🚀');

            Router.push('/Home');
          })
          .catch(error => {
            if (error) {
              toast.error('Wrong crendentials.');
            }
          });
      } catch (err) {
        toast.error('Oops! Something get wrong.');
      }
    },
    [handleAuth],
  );

  const authContextData: AuthContextData = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated,
      account: loggedAccount,
      channels,
    }),
    [signIn, signOut, isAuthenticated, loggedAccount, channels],
  );

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
