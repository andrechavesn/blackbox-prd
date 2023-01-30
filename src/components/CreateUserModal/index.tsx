import * as React from 'react';
import * as Mui from '@mui/material';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { api } from '../../services/api/api';
import { inputStyle } from '../Modal';

interface ResponsiveDialogProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  content: string;
  refetch: () => void;
}
interface FormData {
  name?: string;
  url?: string;
  password?: string;
  roleId?: string;
  channelId?: string;
  userId?: string;
}
export function CreateUserModal({
  isOpen,
  onCloseRequest,
  content,
  refetch,
}: ResponsiveDialogProps) {
  const { handleSubmit, register } = useForm();
  const [roles, setRoles] = useState([]);
  const { 'blackbox.token': token } = parseCookies();

  useEffect(() => {
    const handleRoles = async () => {
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
    };
    handleRoles();
  }, []);

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
            defaultValue=" "
            sx={inputStyle}
            required
          />
          <Mui.TextField
            label="Password"
            {...register('password')}
            variant="outlined"
            size="small"
            sx={inputStyle}
            type="password"
            defaultValue=""
            required
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
                  control={<Mui.Radio required />}
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
      </Mui.Dialog>
    </Mui.Box>
  );
}
