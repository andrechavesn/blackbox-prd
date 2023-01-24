/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import * as React from 'react';
import * as Mui from '@mui/material';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api/api';
import { RoleSelect } from '../RoleSelect';

type Roles = {
  id?: string;
  name?: string;
};

interface ResponsiveDialogProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  content: string;
  id?: string;
  fn:
    | 'create'
    | 'update'
    | 'delete'
    | 'createUser'
    | 'updateUser'
    | 'deleteUser';
  initialValues?: {
    name?: string;
    url?: string;
    password?: string;
    roleId?: string;
  };
  userId?: string;
  refetch?: () => void;
}

interface FormData {
  name?: string;
  url?: string;
  password?: string;
  roleId?: string;
  channelId?: string;
  userId?: string;
}

export const inputStyle = {
  '& .MuiButtonBase-root': {
    backgroundColor: '#cfcfcf',
  },
  '& .MuiOutlinedInput-input': {
    color: 'var(--white)',
  },
  '& .MuiInputLabel-root': {
    color: 'var(--gray)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--white)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--white)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--white)',
      color: 'var(--white)',

      '& .MuiOutlinedInput-input': {
        color: 'var(--white)',
      },
    },
  },
};
function ResponsiveDialog({
  isOpen,
  onCloseRequest,
  content,
  id,
  userId,
  fn,
  initialValues,
  refetch,
}: ResponsiveDialogProps) {
  const [roles, setRoles] = useState<Roles[]>([]);
  const { handleSubmit, register } = useForm();

  const { 'blackbox.token': token } = parseCookies();

  useEffect(() => {
    const handleRoles = async () => {
      if (fn === 'createUser' || fn === 'updateUser') {
        try {
          const response = await api.get('/Account/Roles', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            if (response?.data?.length === 0) {
              toast.info('No users found');
            }
            setRoles(response?.data.value);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    handleRoles();
  }, [fn === 'createUser' || fn === 'updateUser']);

  const updateUser = async (data: FormData) => {
    try {
      const response = await api.put(
        `/Account`,
        {
          name: data.name,
          url: data.url,
          id: userId,
          roleId: data.roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('🚀 ~ file: index.tsx:139 ~ updateUser ~ userId', userId);

      if (response.status === 200) {
        toast.success('User updated successfully! 🚀');
        onCloseRequest();
        refetch();
        console.log('🚀 ~ file: index.tsx:130 ~ updateUser ~ data', data);
      }
    } catch (error) {
      toast.error(error?.response.data.errors[0]);
    }
  };

  const createUser = async (data: FormData) => {
    try {
      const response = await api.post(
        '/Account',
        {
          name: data.name,
          password: data.password,
          roleId: data.roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('User created successfully! 🚀');
        onCloseRequest();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await api.delete(`/Account/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('User deleted successfully! 🚀');
        onCloseRequest();
        refetch();
      }
    } catch (error) {
      toast.error(error?.response.data.errors[0]);
    }
  };

  const updateChannel = async (data: FormData) => {
    try {
      const response = await api.put(
        `/Channel`,
        {
          name: data.name,
          url: data.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('Channel updated successfully! 🚀');
        refetch();
        onCloseRequest();
      }
    } catch (error) {
      toast.error(error?.response.data.errors[0]);
    }
  };

  const createChannel = async (data: FormData) => {
    try {
      const response = await api.post(
        '/Channel',
        {
          name: data.name,
          url: data.url,
          // roleId: role.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('Channel created successfully! 🚀');
        onCloseRequest();
        refetch();
      }
    } catch (error) {
      toast.error(error?.response?.data.errors[0]);
    }
  };

  const deleteChannel = async () => {
    try {
      const response = await api.delete(`/Channel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Channel deleted successfully! 🚀');
        onCloseRequest();
        refetch();
      }
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
          <form onSubmit={fn === 'delete' && handleSubmit(deleteChannel)}>
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
        ) : fn === 'create' ? (
          <form
            onSubmit={handleSubmit(createChannel)}
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
              variant="outlined"
              size="small"
              sx={inputStyle}
            />
            <Mui.TextField
              label="Url"
              {...register('url')}
              variant="outlined"
              size="small"
              sx={inputStyle}
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
        ) : fn === 'update' ? (
          <form
            onSubmit={handleSubmit(updateChannel)}
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
              variant="outlined"
              defaultValue={initialValues?.name}
              size="small"
              sx={inputStyle}
            />
            <Mui.TextField
              label="Url"
              {...register('url')}
              variant="outlined"
              size="small"
              defaultValue={initialValues?.url}
              sx={inputStyle}
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
        ) : fn === 'createUser' ? (
          <form
            onSubmit={handleSubmit(createUser)}
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
              variant="outlined"
              size="small"
              sx={inputStyle}
            />
            <Mui.TextField
              label="Password"
              {...register('password')}
              variant="outlined"
              size="small"
              sx={inputStyle}
              type="password"
            />
            <Mui.RadioGroup
              sx={{
                '& .MuiRadio-root': {
                  color: 'var(--white)',
                },
              }}
            >
              {roles.map(role => {
                return (
                  <Mui.FormControlLabel
                    key={role.id}
                    value={role.id}
                    control={<Mui.Radio />}
                    label={role.name}
                    {...register('roleId')}
                    onClick={() => console.log(role.id)}
                  />
                );
              })}
            </Mui.RadioGroup>
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
        ) : fn === 'updateUser' ? (
          <form
            onSubmit={handleSubmit(updateUser)}
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
              variant="outlined"
              size="small"
              sx={inputStyle}
              defaultValue={initialValues?.name}
            />
            <Mui.TextField
              label="Password"
              {...register('password')}
              variant="outlined"
              size="small"
              sx={inputStyle}
              type="password"
              defaultValue={initialValues?.password}
            />
            <RoleSelect userId={userId} />
            <Mui.RadioGroup
              sx={{
                '& .MuiRadio-root': {
                  color: 'var(--white)',
                },
              }}
            >
              {roles.map(role => {
                return (
                  <Mui.FormControlLabel
                    key={role.id}
                    value={role.id}
                    control={<Mui.Radio />}
                    label={role.name}
                    {...register('roleId')}
                    onClick={() => console.log(role.id)}
                  />
                );
              })}
            </Mui.RadioGroup>
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
        ) : fn === 'deleteUser' ? (
          <form onSubmit={fn === 'deleteUser' && handleSubmit(deleteUser)}>
            <Mui.DialogContentText
              sx={{
                color: 'var(--gray)',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              Are you sure you want to delete this user?
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
        ) : null}
      </Mui.Dialog>
    </Mui.Box>
  );
}

export default React.memo(ResponsiveDialog);
