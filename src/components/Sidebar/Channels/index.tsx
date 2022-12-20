import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Circle } from '../styles';
import {
  Container,
  TitleBox,
  Title,
  Content,
  ChannelsList,
  Channel,
} from './styles';

export function Channels() {
  const { channels } = useContext(AuthContext);

  return (
    <Container>
      <TitleBox>
        <Circle color="var(--black)" />
        <Title>Channels</Title>
      </TitleBox>
      <Content>
        <ChannelsList>
          {channels?.value.map(channel => (
            <Channel key={channel.id}>{channel.name}</Channel>
          ))}
        </ChannelsList>
      </Content>
    </Container>
  );
}
