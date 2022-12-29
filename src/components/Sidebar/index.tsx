import { IoSettings } from 'react-icons/io5';
import { parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';
import { ReactElement, useContext, useEffect, useState } from 'react';

import { Button } from '../Button';
import { Channels } from './Channels';
import { SearchBar } from './SearchBar';
import { Main, Container, Header, TitleBox, Title, Content } from './styles';
import { AuthContext } from '../../contexts/AuthContext';

interface SidebarProps {
  children: ReactElement;
}

type AccountProps = {
  exp: number;
  iat: number;
  nbf: number;
  id: string;
  username: string;
  primarygroupsid: string;
};

export function Sidebar({ children }: SidebarProps) {
  const [loggedAccount, setLoggedAccount] = useState<AccountProps>();

  const { signOut, account } = useContext(AuthContext);

  return (
    <Main>
      <Container>
        <Header>
          <TitleBox>
            <Title>Home</Title>
          </TitleBox>
          <SearchBar />
        </Header>
        <Content>
          <Channels />

          {account ? (
            account?.primarygroupsid === 'admin' && (
              <Button icon={IoSettings} size="normal" onClick={signOut}>
                Manager
              </Button>
            )
          ) : (
            <Button icon={IoSettings} size="normal" onClick={signOut}>
              Settings
            </Button>
          )}
        </Content>
      </Container>
      {children}
    </Main>
  );
}
