/* eslint-disable react-hooks/exhaustive-deps */
import * as Mui from '@mui/material';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { IoSettingsSharp, IoTrash } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';
import { api } from '../../services/api/api';

type Users = {
  id?: string;
  roleId?: string;
  name?: string;
  password?: string;
};
export default function Users() {
  const [users, setUsers] = useState<Users[]>();
  const [createUser, setCreateUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [userId, setUserId] = useState<string>();
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

          console.log('aqui', response?.data.value);
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
        flexDirection: 'column',
        backgroundColor: '#ccc',
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
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 32px',

          '@media (max-width: 420px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
          },
        }}
      >
        <Mui.Typography
          sx={{
            color: 'var(--black)',
            fontSize: '1.6rem',
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
            width: '130px',
            height: '40px',
            backgroundColor: 'var(--black)',
          }}
          onClick={() => setCreateUser(true)}
        >
          <Mui.Typography
            sx={{
              color: 'var(--white)',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              fontFamily: 'JetBrains Mono',
            }}
          >
            NEW USER
          </Mui.Typography>
        </Mui.Button>

        <Mui.Link
          href="/Home"
          sx={{
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
              opacity: '0.7',
            },
          }}
        >
          <Mui.Typography
            sx={{
              color: 'var(--black)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              fontFamily: 'JetBrains Mono',
              textDecoration: 'underline',
            }}
          >
            Back
          </Mui.Typography>
        </Mui.Link>
      </Mui.Box>

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
          {/* <UsersTable
            data={users}
            isLoading={false}
            columns={[
              {
                id: 'role',
                label: 'Role',
                minWidth: 40,
                align: 'center',
              },
              {
                id: 'name',
                label: 'Name',
                minWidth: 40,
                align: 'center',
              },
            ]}
          /> */}

          <Mui.List>
            {users?.map(value => (
              <>
                <Mui.ListItem
                  key={value.id}
                  sx={{
                    width: '100%',
                    height: '32px',
                    fontSize: '0.8rem',
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
                              fontSize: '1rem',
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
                            size="1rem"
                            onClick={() => {
                              setUserId(value.id);
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

                <Modal
                  refetch={refetch}
                  isOpen={deleteUser}
                  content="Do you want to delete this user?"
                  onCloseRequest={() => {
                    setDeleteUser(false);
                  }}
                  fn="deleteUser"
                  userId={userId}
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
