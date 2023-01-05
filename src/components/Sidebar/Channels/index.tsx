/* eslint-disable no-console */
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AuthContext } from '../../../contexts/AuthContext';
import { ChannelContext } from '../../../contexts/ChannelContext';
import { api } from '../../../services/api/api';
import Modal from '../../Modal';
import { Circle } from '../styles';
import { Channel } from './Channel';

import { Container, TitleBox, Title, Content, ChannelsList } from './styles';

interface FormData {
  name: string;
  url: string;
}
export function Channels({ adminMode }: { adminMode: boolean }) {
  const { handleChannel } = useContext(ChannelContext);
  const { channels } = useContext(AuthContext);
  const [Delete, setDelete] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [Create, setCreate] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleDeleteChannel = async (channelId: string) => {
    try {
      await api.delete(`/Channel/${channelId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const createChannel = async (data: FormData) => {
    try {
      await api.post('/Channel', {
        name: data.name,
        url: data.url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                <Channel
                  ChannelTasks={{
                    handleDeleteChannel: () => {
                      handleDeleteChannel(channel.id);
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
                    await handleChannel(channel.id);
                  }}
                  key={channel.id}
                >
                  {channel.name}
                </Channel>
              ))
            ) : (
              <>Loading...</>
            )}
          </ChannelsList>
        </Content>
      </Container>
      <Modal
        isOpen={Delete}
        content="You are about to delete a channel, do you want to continue?"
        fn={{
          onCloseRequest: () => {
            setDelete(false);
          },
          onAgreeRequest: () => {
            console.log('delete');
          },
          onDisagreeRequest: () => {
            console.log('cancel');
            setDelete(false);
          },
        }}
      />
      <Modal
        isOpen={Create}
        content="create"
        fn={{
          onCloseRequest: () => {
            setCreate(false);
          },
          onAgreeRequest: () => {
            console.log('create');
          },
          onDisagreeRequest: () => {
            console.log('cancel');
            setCreate(false);
          },
        }}
      />
      <Modal
        isOpen={Update}
        content="update"
        fn={{
          onCloseRequest: () => {
            setUpdate(false);
          },
          onAgreeRequest: () => {
            console.log('update');
          },
          onDisagreeRequest: () => {
            console.log('cancel');
            setUpdate(false);
          },
        }}
      />
    </>
  );
}
