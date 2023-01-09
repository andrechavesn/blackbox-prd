/* eslint-disable no-console */
import * as React from 'react';
import * as Mui from '@mui/material';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api/api';

interface ResponsiveDialogProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  content: string;
  id?: string;
  fn: 'create' | 'update' | 'delete';
}

interface FormData {
  name?: string;
  url?: string;
}

export default function ResponsiveDialog({
  isOpen,
  onCloseRequest,
  content,
  id,
  fn,
}: ResponsiveDialogProps) {
  const { handleSubmit, register } = useForm();

  const updateChannel = async (data: FormData) => {
    try {
      const response = await api.put(`/Channel/${id}`, {
        name: data.name,
        url: data.url,
      });
      console.log(
        '🚀 ~ file: index.tsx:41 ~ createChannel ~ response',
        response,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createChannel = async (data: FormData) => {
    try {
      const response = await api.post('/Channel', {
        name: data.name,
        url: data.url,
      });
      console.log(
        '🚀 ~ file: index.tsx:41 ~ createChannel ~ response',
        response,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChannel = async () => {
    try {
      await api.delete(`/Channel/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Mui.Box>
      <Mui.Dialog
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'var(--black)',
            color: 'var(--white)',
          },
        }}
        open={isOpen}
        onClose={onCloseRequest}
        // onSubmit={handleSubmit(handleUpdate)}
        aria-labelledby="responsive-dialog-title"
      >
        <Mui.DialogTitle id="responsive-dialog-title">
          {content}
        </Mui.DialogTitle>
        {fn === 'delete' ? (
          <form onSubmit={fn === 'delete' && deleteChannel}>
            <Mui.DialogContentText
              sx={{
                color: 'var(--gray)',
                padding: '8px 0px',
                textAlign: 'center',
              }}
            >
              Are you sure you want to delete this channel?
            </Mui.DialogContentText>
            <Mui.DialogActions
              sx={{
                paddingBottom: '1rem',
              }}
            >
              <Mui.Button
                autoFocus
                onClick={onCloseRequest}
                variant="contained"
                color="error"
              >
                Disagree
              </Mui.Button>
              <Mui.Button
                type="submit"
                autoFocus
                variant="contained"
                color="success"
              >
                Agree
              </Mui.Button>
            </Mui.DialogActions>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(
              fn === 'create'
                ? createChannel
                : fn === 'update'
                ? updateChannel
                : () => {
                    console.log('error');
                  },
            )}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
            }}
          >
            <Mui.TextField
              label="Name"
              {...register('name')}
              variant="standard"
              color="primary"
            />
            <Mui.TextField
              sx={{
                color: 'var(--white)',
              }}
              label="Url"
              {...register('url')}
              variant="standard"
              color="primary"
            />

            <Mui.DialogActions
              sx={{
                paddingBottom: '1rem',
              }}
            >
              <Mui.Button
                autoFocus
                onClick={onCloseRequest}
                variant="contained"
                color="error"
              >
                Disagree
              </Mui.Button>
              <Mui.Button
                type="submit"
                autoFocus
                variant="contained"
                color="success"
              >
                Agree
              </Mui.Button>
            </Mui.DialogActions>
          </form>
        )}
      </Mui.Dialog>
    </Mui.Box>
  );
}
