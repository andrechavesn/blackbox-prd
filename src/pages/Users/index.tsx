/* eslint-disable react-hooks/exhaustive-deps */
import * as Mui from '@mui/material';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import {
  IoReturnDownBackOutline,
  IoSettingsSharp,
  IoTrash,
} from 'react-icons/io5';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';
import { api } from '../../services/api/api';
import { UpdateModal } from '../../components/UpdateModal';

type Users = {
  id?: string;
  roleId?: string;
  name?: string;
  password?: string;
};
export default function Users() {
  const [users, setUsers] = useState<Users[]>();
  const [createUser, setCreateUser] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const { push } = useRouter();
  const [user, setUser] = useState({
    id: null,
    name: null,
    roleId: null,
  });

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
      toast.error(error.message);
    }
  }, []);
  return (
    <Mui.Box
      sx={{
        width: '100%',
        display: 'flex',
        backgroundColor: '#ccc',
        position: 'relative',
        svg: {
          '&:hover': {
            opacity: '0.7',
            transform: 'scale(1.2)',
          },
        },
      }}
    >
      <Mui.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          position: 'absolute',
          top: '24px',
          left: '32px',
        }}
      >
        <Mui.Typography
          sx={{
            color: 'var(--black)',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontFamily: 'JetBrains Mono',
          }}
        >
          Users
        </Mui.Typography>
        <Mui.Button
          autoFocus
          variant="contained"
          color="success"
          size="medium"
          sx={{
            width: '150px',
            height: '48px',
            backgroundColor: 'var(--black)',
          }}
          onClick={() => setCreateUser(true)}
        >
          <Mui.Typography
            sx={{
              color: 'var(--white)',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'JetBrains Mono',
            }}
          >
            NEW USER
          </Mui.Typography>
        </Mui.Button>
      </Mui.Box>
      <Tooltip title="Home">
        <IoReturnDownBackOutline
          style={{
            position: 'absolute',
            top: '24px',
            right: '32px',
            fontSize: '3rem',
            color: 'var(--black)',
            cursor: 'pointer',

            transition: 'all 0.2s ease-in-out',
          }}
          onClick={() => push('/Home')}
        />
      </Tooltip>
      <Mui.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          width: '100%',
        }}
      >
        <Mui.Box
          sx={{
            width: '95%',
            height: '420px',
            backgroundColor: 'var(--black)',
            borderRadius: '12px',
            border: '2px solid #f7f7f7',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Mui.List>
            {users?.map(value => (
              <>
                <Mui.ListItem
                  key={value.id}
                  sx={{
                    width: '100%',
                    height: '48px',
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottom: '1px solid #f7f7f7',
                    color: 'var(--white)',
                  }}
                  secondaryAction={
                    <Mui.IconButton aria-label="comment">
                      <Mui.Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '12px',
                          alignItems: 'center',
                          paddingRight: '12px',
                        }}
                      >
                        <Mui.Box
                          sx={{
                            svg: {
                              color: 'var(--white)',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                cursor: 'pointer',
                                color: '#beb7b7',
                                transform: 'scale(1.2)',
                              },
                            },
                          }}
                        >
                          <IoSettingsSharp
                            onClick={() => {
                              push(`/Users/EditUser/${value.id}`);
                            }}
                          />
                        </Mui.Box>
                        <Mui.Box
                          sx={{
                            svg: {
                              color: 'var(--white)',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                cursor: 'pointer',
                                color: 'var(--red)',
                                transform: 'scale(1.2)',
                              },
                            },
                          }}
                        >
                          <IoTrash
                            onClick={() => {
                              setUser({ ...user, id: value.id });
                              setDeleteUser(true);
                            }}
                          />
                        </Mui.Box>
                      </Mui.Box>
                    </Mui.IconButton>
                  }
                >
                  {value.name}
                </Mui.ListItem>

                {/* <UpdateModal
                  refetch={refetch}
                  content="Do you want to update this user?"
                  isOpen={updateUser}
                  onCloseRequest={() => {
                    setUpdateUser(false);
                  }}
                  initialValues={{
                    name: user.name,
                    roleId: user.roleId,
                  }}
                  userId={user.id}
                /> */}
                <Modal
                  refetch={refetch}
                  isOpen={deleteUser}
                  content="Do you want to delete this user?"
                  onCloseRequest={() => {
                    setDeleteUser(false);
                  }}
                  fn="deleteUser"
                  userId={value?.id}
                />
              </>
            ))}
          </Mui.List>
        </Mui.Box>
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
    </Mui.Box>
  );
}
