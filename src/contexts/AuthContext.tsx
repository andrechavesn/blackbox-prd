import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
// eslint-disable-next-line camelcase
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
  signIn: (credentials: ISignInData) => Promise<void>;
  signOut: () => Promise<void>;
  channels: ChannelProps;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
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

  const signIn = useCallback(async ({ username, password }: ISignInData) => {
    try {
      setIsLoading(true);

      const data = new FormData();
      data.append('username', username);
      data.append('password', password);

      await axios
        .post(
          'http://web-dev.eba-jrk4uvgx.eu-west-1.elasticbeanstalk.com/api/Account',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'request-method': 'POST',
            },
          },
        )

        .then(response => {
          const { token } = response.data;

          setCookie(undefined, 'blackbox.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
          });

          const account: JwtProps = jwtDecode(token);

          setLoggedAccount(account);

          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          toast.success('Login efetuado com sucesso! 🚀');

          Router.push('/Home');
        })
        .catch(error => {
          if (error) {
            toast.error('Usuário ou senha inválidos.');
          }
        });
    } catch (err) {
      toast.error('Erro ao efetuar login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const { 'blackbox.token': token } = parseCookies();

    if (token) {
      const config = {
        method: 'get',
        url: 'http://web-dev.eba-jrk4uvgx.eu-west-1.elasticbeanstalk.com/api/Channel',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(response => {
          setChannels(response.data);
        })
        .catch(error => {
          if (error) {
            toast.error('Erro ao carregar canais');
          }
        });
    } else {
      signOut();
    }
  }, []);

  const authContextData: AuthContextData = useMemo(
    () => ({
      signIn,
      signOut,
      isLoading,
      isAuthenticated,
      account: loggedAccount,
      channels,
    }),
    [signIn, signOut, isLoading, isAuthenticated, loggedAccount, channels],
  );

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
