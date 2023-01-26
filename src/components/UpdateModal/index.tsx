import * as Mui from '@mui/material';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../services/api/api';
import { inputStyle } from '../Modal';

interface UpdateModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
  content: string;
  userId: string;
  initialValues: {
    name: string;
    roleId: string;
  };
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

export function UpdateModal({
  isOpen,
  onCloseRequest,
  content,
  userId,
  refetch,
  initialValues,
}: UpdateModalProps) {
  const { handleSubmit, register } = useForm();
  const [roles, setRoles] = useState<any[]>([]);
  const { 'blackbox.token': token } = parseCookies();

  const updateUser = async (data: FormData) => {
    try {
      if (data.name === '') {
        toast.error('Name is required');
        return;
      }
      const response = await api.put(
        `/Account`,
        {
          name: data.name,
          id: userId,
          roleId: data.roleId && data.roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success('User updated successfully! 🚀');

        onCloseRequest();
        refetch();
      }
    } catch (error) {
      toast.error(error?.response.data.errors[0]);
    }
  };
  return (
    <Mui.Dialog
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'var(--black)',
          color: 'var(--white)',
          width: '60%',
        },
      }}
      open={isOpen}
      onClose={onCloseRequest}
      // onSubmit={handleSubmit(handleUpdate)}
      aria-labelledby="responsive-dialog-title"
    >
      <Mui.DialogTitle id="responsive-dialog-title">{content}</Mui.DialogTitle>
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
          required
          label="Name"
          {...register('name')}
          variant="outlined"
          size="small"
          sx={inputStyle}
          defaultValue={initialValues?.name}
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
                defaultValue={role.id}
                control={<Mui.Radio />}
                label={role.name}
                {...register('roleId')}
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
  );
}
