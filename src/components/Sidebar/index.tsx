import { ReactElement, useContext, useState } from 'react';
import { Channels } from './Channels';
import {
  Main,
  Container,
  Header,
  TitleBox,
  Title,
  Content,
  Logo,
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { Switch } from '../Switch';

interface SidebarProps {
  children: ReactElement;
}

export function Sidebar({ children }: SidebarProps) {
  const { account } = useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <Main>
      <Container>
        <Header>
          <TitleBox>
            <Title>Home</Title>

            {/* {account && account?.primarygroupsid === 'admin' && (
              <Switch
                isOn={isSwitchOn}
                onChangeRequest={() => setIsSwitchOn(!isSwitchOn)}
              />
            )} */}
          </TitleBox>
        </Header>
        <Content>
          <Channels adminMode={isSwitchOn} />
        </Content>
        <Logo src="/assets/logo.svg" />
      </Container>
      {children}
    </Main>
  );
}
