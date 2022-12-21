import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { ChannelContext } from '../../../contexts/ChannelContext';
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
  // const { channels } = useContext(AuthContext);
  // const { push } = useRouter();
  const { handleChannel } = useContext(ChannelContext);

  return (
    <Container>
      <TitleBox>
        <Circle color="var(--black)" />
        <Title>Channels</Title>
      </TitleBox>
      <Content>
        <ChannelsList>
          {/* <Channel>
           {channels ? (
            channels?.value.map(channel => (
              <Channel
                onClick={async () => {
                  await handleChannel(channel.id);
                  // push(`/Home/Player/${channel.id}`);
                }}
                key={channel.id}
              >
                {channel.name}
              </Channel>
            ))
          ) : (
            <Channel>Carregando...</Channel>
          )}  */}
          <Channel
            onClick={() => {
              handleChannel('wss://stream.black-box.uk:3334/app/squawk');
            }}
          >
            Squawk
          </Channel>
          <Channel
            onClick={() => {
              handleChannel('wss://stream.black-box.uk:3334/app/reuters');
            }}
          >
            Reuters
          </Channel>
          <Channel
            onClick={() => {
              handleChannel('wss://stream.black-box.uk:3334/app/platts');
            }}
          >
            Platts
          </Channel>
        </ChannelsList>
      </Content>
    </Container>
  );
}
