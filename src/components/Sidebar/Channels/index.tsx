/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { parseCookies } from 'nookies';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { ChannelContext, ChannelProps } from '../../../contexts/ChannelContext';
import { api } from '../../../services/api/api';
import { Modal } from '../../Modal';
import { Circle } from '../styles';
import { Channel } from './Channel';

import { Container, TitleBox, Title, Content, ChannelsList } from './styles';

interface ChannelsProps {
  adminMode: boolean;
}
export function Channels({ adminMode }: ChannelsProps) {
  const { handleChannel } = useContext(ChannelContext);
  const [Delete, setDelete] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [Create, setCreate] = useState(false);
  const [channelsData, setChannels] = useState<ChannelProps>();
  const [selectedChannel, setSelectedChannel] = useState<any>();
  const { 'blackbox.token': token } = parseCookies();

  const refetch = useCallback(async () => {
    try {
      const response = await api.get('/Channel', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChannels(response?.data);
    } catch (error) {
      toast.error(error?.response.data.errors[0]);
    }
  }, []);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await api.get('/Channel', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChannels(response?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    apiCall();
  }, []);

  return (
    <Container>
      <TitleBox adminMode={adminMode}>
        <Circle color="var(--black)" />
        <Title>Channels</Title>
        {adminMode && <IoAddCircleOutline onClick={() => setCreate(true)} />}
      </TitleBox>
      <Content>
        <ChannelsList>
          {channelsData ? (
            channelsData?.value.map(channel => (
              <Channel
                key={channel.id}
                ChannelTasks={{
                  handleDeleteChannel: async () => {
                    setSelectedChannel(channel);
                    setDelete(true);
                  },
                  handleEditChannel: async () => {
                    setSelectedChannel(channel);
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
              >
                {channel.name}
              </Channel>
            ))
          ) : (
            <>Loading...</>
          )}
        </ChannelsList>
      </Content>

      <Modal
        refetch={refetch}
        isOpen={Create}
        content="Do you want to create a new channel?"
        onCloseRequest={() => {
          setCreate(false);
        }}
        fn="create"
      />
      <Modal
        refetch={refetch}
        isOpen={Update}
        content="Do you want to edit the channel information?"
        id={selectedChannel?.id}
        selectedChannel={selectedChannel}
        onCloseRequest={() => {
          setUpdate(false);
        }}
        fn="update"
      />
      <Modal
        refetch={refetch}
        isOpen={Delete}
        content="Do you want to delete the channel?"
        id={selectedChannel?.id}
        onCloseRequest={() => {
          setDelete(false);
        }}
        fn="delete"
      />
    </Container>
  );
}
