/* eslint-disable react-hooks/exhaustive-deps */
import * as Mui from '@mui/material';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { api } from '../../services/api/api';

import Modal from '../Modal';
import Users from '../Users';

interface UsersModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
}

type Users = {
  id?: string;
  roleId?: string;
  username?: string;
  password?: string;
};

export function UsersModal({ isOpen, onCloseRequest }: UsersModalProps) {
  const [createUser, setCreateUser] = useState(false);
  const [users, setUsers] = useState<Users[]>();
  const { 'blackbox.token': token } = parseCookies();

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await api.get('/Account/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          if (response?.data?.length === 0) {
            toast.info('No users found');
          }
          setUsers(response?.data.value);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    apiCall();
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await api.get('/Account/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response?.data.value);
    } catch (error) {
      toast.error(error?.response.data.errors[0]);
    }
  }, []);
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
        <Mui.Box
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '16px',
            cursor: 'pointer',

            '& svg': {
              '&:hover': {
                transition: '0.2s',
                color: 'var(--gray)',
                transform: 'scale(1.2)',
              },
            },
          }}
        >
          <Mui.DialogTitle id="responsive-dialog-title">Users</Mui.DialogTitle>
          <IoAdd size={24} onClick={() => setCreateUser(true)} />
        </Mui.Box>
        <Mui.DialogContent>
          <Mui.DialogContentText>
            <Users refetch={refetch} users={users} />
          </Mui.DialogContentText>
        </Mui.DialogContent>
        <Mui.DialogActions />
      </Mui.Dialog>
      <Modal
        refetch={refetch}
        isOpen={createUser}
        content="Do you want to create a new user?"
        onCloseRequest={() => {
          setCreateUser(false);
        }}
        fn="createUser"
      />
    </Mui.Box>
  );
}
