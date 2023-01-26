import { ReactElement, useContext, useState } from 'react';
import * as Mui from '@mui/material';
import { useRouter } from 'next/router';
import { Channels } from './Channels';
import {
  Main,
  Container,
  Header,
  TitleBox,
  Title,
  Content,
  Logo,
  ButtonsBox,
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { Switch } from '../Switch';
import { MenuButton } from '../MenuButton';

interface SidebarProps {
  children: ReactElement;
}

export function Sidebar({ children }: SidebarProps) {
  const { account } = useContext(AuthContext);
  const { asPath } = useRouter();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Main>
      <Container isOpen={isOpen}>
        <MenuButton handleClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        {!!isOpen && (
          <>
            <Header>
              <TitleBox>
                <Title>{asPath?.replace('/', '').split('/')[0]}</Title>
                {/* <Logo /> */}
                {account && account?.primarygroupsid === 'admin' && (
                  <ButtonsBox>
                    <Switch
                      isOn={isSwitchOn}
                      onChangeRequest={() => setIsSwitchOn(!isSwitchOn)}
                    />
                  </ButtonsBox>
                )}
              </TitleBox>
              {account && account?.primarygroupsid === 'admin' && (
                <Mui.Link
                  href="/Users"
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  <Mui.Button
                    variant="contained"
                    color="success"
                    sx={{
                      color: 'white',
                      fontSize: '0.7rem',
                      backgroundColor: 'var(--dark)',
                      fontFamily: 'JetBrains Mono',
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      right: '24px',
                    }}
                  >
                    edit users
                  </Mui.Button>
                </Mui.Link>
              )}
            </Header>
            <Content>
              <Channels adminMode={isSwitchOn} />
            </Content>
          </>
        )}
      </Container>
      {children}
    </Main>
  );
}
