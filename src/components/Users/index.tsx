/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import * as Mui from '@mui/material';
import { IoSettingsSharp, IoTrash } from 'react-icons/io5';
import Modal from '../Modal';

interface UserProps {
  refetch: () => void;
  users: any;
}

export default function Users({ refetch, users }: UserProps) {
  const [updateUser, setUpdateUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    roleId: '',
    password: '',
  });

  return (
    <Mui.List
      sx={{
        width: '320px',
        height: '100px',
        color: 'var(--white)',
        position: 'relative',
        overflowY: 'auto',
        backgroundColor: 'var(--dark)',
        borderRadius: '3px',
        border: '1px solid var(--gray)',
      }}
    >
      {users.length > 0 ? (
        users?.map(value => (
          <>
            <Mui.ListItem
              sx={{
                borderBottom: '1px solid var(--gray)',
                padding: '8px',
              }}
              key={value}
              disableGutters
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
                            color: 'var(--black)',
                            transform: 'scale(1.2)',
                          },
                        },
                      }}
                    >
                      <IoSettingsSharp
                        onClick={() => {
                          setUser({
                            id: value.id,
                            name: value.name,
                            roleId: value.roleId,
                            password: value.password,
                          });
                          setUpdateUser(true);
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
              <Mui.ListItemText primary={value.name} />
            </Mui.ListItem>
            <Modal
              isOpen={updateUser}
              onCloseRequest={() => {
                setUpdateUser(false);
              }}
              fn="updateUser"
              userId={user.id}
              initialValues={{
                name: user.name,
                password: user.password,
                roleId: user.roleId,
              }}
              key={user.name}
              content="Update User"
              refetch={refetch}
            />
            <Modal
              isOpen={deleteUser}
              onCloseRequest={() => {
                setDeleteUser(false);
              }}
              fn="deleteUser"
              userId={user.id}
              content="Delete User"
              refetch={refetch}
            />
          </>
        ))
      ) : (
        <Mui.ListItem key={1} disableGutters>
          <Mui.ListItemText primary="No user available" />
        </Mui.ListItem>
      )}
    </Mui.List>
  );
}
