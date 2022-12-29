import { AxiosError } from 'axios';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api/api';

interface ChannelContextData {
  handleChannel: (channelId: string) => Promise<void>;
  channel: Channel;
}

type ChannelProviderProps = {
  children: ReactNode;
};

interface Channel {
  value: {
    id: string;
    name: string;
    url: string;
  };
}

export const ChannelContext = createContext({} as ChannelContextData);

export function ChannelProvider({
  children,
}: ChannelProviderProps): JSX.Element {
  const [channel, setChannel] = useState<Channel>();

  const handleChannel = async (channelId: string) => {
    try {
      const response = await api.get(`/Channel/${channelId}`);

      setChannel(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
    }
  };

  const channelContextData = useMemo(
    () => ({
      handleChannel,
      channel,
    }),
    [channel],
  );

  return (
    <ChannelContext.Provider value={channelContextData}>
      {children}
    </ChannelContext.Provider>
  );
}
