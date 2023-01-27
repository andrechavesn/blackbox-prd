/* eslint-disable array-callback-return */
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api/api';
import { inputStyle } from '../Modal';

interface RoleSelectProps {
  userId: any;
  channelList: any;
}

type Channel = {
  id: string;
  name: string;
  url: string;
};
export function RoleSelect({ userId, channelList }: RoleSelectProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<any>(
    channelList !== undefined ? channelList : [],
  );
  const [loading, setLoading] = useState(true);

  const { 'blackbox.token': token } = parseCookies();
  useEffect(() => {
    if (channelList !== undefined) {
      setSelectedChannel(channelList);
    }
  }, [channelList]);

  useEffect(() => {
    const handleChannels = async () => {
      try {
        const response = await api.get('/Channel/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setChannels(response.data.value);
        }
        setLoading(false);
      } catch (err) {
        toast.error('Error loading channels');
        setLoading(false);
      }
    };
    handleChannels();
  }, []);

  const handleRelation = async ({
    channelid,
    userid,
  }: {
    channelid: string;
    userid: string;
  }) => {
    try {
      const config = {
        method: 'post',
        url: `https://api.black-box.uk/api/Channel/Relation/${channelid}/${userid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config).then(() => {
        try {
          toast.success('Channel added');
        } catch (error) {
          toast.error(error?.message);
        }
      });
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleRemoveRelation = async ({
    channelid,
    userid,
  }: {
    channelid: string;
    userid: string;
  }) => {
    try {
      if (channelid !== undefined) {
        const config = {
          method: 'delete',
          url: `https://api.black-box.uk/api/Channel/Relation/${channelid}/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios(config).then(() => {
          toast.success('Channel removed');
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Autocomplete
      multiple
      sx={{
        width: '352px',
      }}
      size="small"
      id="channel-select"
      options={channels}
      value={selectedChannel}
      filterSelectedOptions
      freeSolo
      getOptionLabel={option => option.name || ''}
      onChange={(event, value, reason) => {
        setSelectedChannel(value);
        if (reason === 'selectOption') {
          handleRelation({
            channelid: value[value.length - 1]?.id,
            userid: userId,
          });
        }
        if (reason === 'removeOption') {
          handleRemoveRelation({
            channelid: selectedChannel[selectedChannel.length - 1]?.id,
            userid: userId,
          });
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          sx={inputStyle}
          size="small"
          disabled={loading}
          variant="outlined"
          autoComplete="off"
        />
      )}
    />
  );
}
