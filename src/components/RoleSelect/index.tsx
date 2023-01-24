import { Autocomplete, TextField } from '@mui/material';
import { parseCookies } from 'nookies';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../services/api/api';
import { inputStyle } from '../Modal';

interface RoleSelectProps {
  userId: string;
}
export function RoleSelect({ userId }: RoleSelectProps) {
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<[]>([]);

  const { 'blackbox.token': token } = parseCookies();

  // useEffect(() => {
  //   setSelectedChannel(channels.filter(x => channel.find(y => y.id === x.id)));
  // }, [channel, channels]);
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

  const handleRelation = useCallback(async ({ channelid, userid }) => {
    try {
      const relationResponse = await api.post(
        `/Channel/Relation/${channelid}/${userid}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(userId);

      console.log(relationResponse);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Autocomplete
      multiple
      sx={{
        width: '100%',
      }}
      size="small"
      id="autocomplete-department"
      options={channels}
      value={selectedChannel}
      filterSelectedOptions
      freeSolo
      getOptionLabel={option => option.name || ''}
      onChange={(event: any, value: any) => {
        setSelectedChannel(value);
        handleRelation({ channelid: value[0].id, userid: userId });
      }}
      renderInput={params => (
        <TextField
          {...params}
          sx={inputStyle}
          size="small"
          disabled={loading}
          label="Selecione o canal"
          variant="outlined"
          autoComplete="off"
        />
      )}
    />
  );
}
