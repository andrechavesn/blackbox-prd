import { ReactElement, useContext, useState } from 'react';
import * as Mui from '@mui/material';
import { Channels } from './Channels';
import {
  Main,
  Container,
  Header,
  TitleBox,
  Content,
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
                {account && account?.primarygroupsid === 'admin' && (
                  <ButtonsBox>
                    <Switch
                      isOn={isSwitchOn}
                      onChangeRequest={() => setIsSwitchOn(!isSwitchOn)}
                    />
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
                          fontSize: '0.6rem',
                          backgroundColor: 'var(--dark)',
                          fontFamily: 'JetBrains Mono',
                        }}
                      >
                        edit users
                      </Mui.Button>
                    </Mui.Link>
                  </ButtonsBox>
                )}
              </TitleBox>
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
