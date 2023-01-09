/* eslint-disable no-console */
import { useContext, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AuthContext } from '../../../contexts/AuthContext';
import { ChannelContext } from '../../../contexts/ChannelContext';
import Modal from '../../Modal';
import { Circle } from '../styles';
import { Channel } from './Channel';

import { Container, TitleBox, Title, Content, ChannelsList } from './styles';

export function Channels({ adminMode }: { adminMode: boolean }) {
  const { handleChannel } = useContext(ChannelContext);
  const { channels } = useContext(AuthContext);
  const [Delete, setDelete] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [Create, setCreate] = useState(false);

  return (
    <Container>
      <TitleBox adminMode={adminMode}>
        <Circle color="var(--black)" />
        <Title>Channels</Title>
        {adminMode && <IoAddCircleOutline onClick={() => setCreate(true)} />}
      </TitleBox>
      <Content>
        <ChannelsList>
          {channels ? (
            channels.value?.map(channel => (
              <>
                <Channel
                  ChannelTasks={{
                    handleDeleteChannel: async () => {
                      setDelete(true);
                    },
                    handleEditChannel: () => {
                      setUpdate(true);
                    },
                    handlePlayChannel: async () => {
                      await handleChannel(channel.id);
                    },
                  }}
                  adminMode={adminMode}
                  onClick={async () => {
                    if (adminMode) return;
                    await handleChannel(channel?.id);
                  }}
                  key={channel.id}
                >
                  {channel.name}
                </Channel>
                <Modal
                  isOpen={Update}
                  content="Do you want to edit the channel information?"
                  id={channel.id}
                  onCloseRequest={() => setUpdate(false)}
                  fn="update"
                />
                <Modal
                  isOpen={Delete}
                  content="Do you want to delete the channel?"
                  id={channel.id}
                  onCloseRequest={() => setDelete(false)}
                  fn="delete"
                />
              </>
            ))
          ) : (
            <>Loading...</>
          )}
        </ChannelsList>
      </Content>
      <Modal
        isOpen={Create}
        content="Do you want to create a new channel?"
        onCloseRequest={() => setCreate(false)}
        fn="create"
      />
    </Container>
  );
}
