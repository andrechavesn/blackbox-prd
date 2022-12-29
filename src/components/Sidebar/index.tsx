import { IoSettings } from 'react-icons/io5';
import { ReactElement, useContext } from 'react';

import { Button } from '../Button';
import { Channels } from './Channels';
import { SearchBar } from './SearchBar';
import { Main, Container, Header, TitleBox, Title, Content } from './styles';
import { AuthContext } from '../../contexts/AuthContext';

interface SidebarProps {
  children: ReactElement;
}

export function Sidebar({ children }: SidebarProps) {
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
