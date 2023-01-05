import { AxiosError } from 'axios';
import { createContext, ReactNode, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api/api';

interface ChannelContextData {
  handleChannel: (channelId: string) => Promise<void>;
  channel: ChannelProps;
}

type ChannelProviderProps = {
  children: ReactNode;
};

export type FormProps = {
  name: string;
  url: string;
};

export type ChannelProps = {
  value: [
    {
      id: string;
      name: string;
      url: string;
    },
  ];
};

export const ChannelContext = createContext({} as ChannelContextData);

export function ChannelProvider({
  children,
}: ChannelProviderProps): JSX.Element {
  const [channel, setChannel] = useState<ChannelProps>();

  const handleChannel = useMemo(
    () => async (channelId: string) => {
      try {
        const response = await api.get(`/Channel/${channelId}`);

        setChannel(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response.data.message);
        }
      }
    },
    [],
  );

  const channelContextData = useMemo(
    () => ({
      handleChannel,
      channel,
    }),
    [channel, handleChannel],
  );

  return (
    <ChannelContext.Provider value={channelContextData}>
      {children}
    </ChannelContext.Provider>
  );
}
