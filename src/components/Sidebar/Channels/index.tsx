import { useRouter } from 'next/router';
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
  const { push } = useRouter();

  // create a function that get channel name and channel url and   set in the url
  function handleChannel(channelName: string, channelUrl: string) {
    push(`/channels/${channelName}/${channelUrl}`);
  }

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
