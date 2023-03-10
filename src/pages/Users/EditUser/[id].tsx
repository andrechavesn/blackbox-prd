/* eslint-disable react-hooks/exhaustive-deps */
import { parseCookies } from 'nookies';
import * as Mui from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { api } from '../../../services/api/api';
import { inputStyle } from '../../../components/Modal';
import { RoleSelect } from '../../../components/RoleSelect';

interface FormData {
  name?: string;
  url?: string;
  password?: string;
  roleId?: string;
  channelId?: string;
  userId?: string;
}

export default function EditUser() {
  const { query, push } = useRouter();
  const [user, setUser] = useState<any>();
  const [roles, setRoles] = useState<any[]>([]);
  const { 'blackbox.token': token } = parseCookies();
  const { register, handleSubmit } = useForm();

  const updateUser = async (data: FormData) => {
    try {
      if (data) {
        const response = await api.put(
          `/Account`,
          {
            name: data.name,
            id: user.id,
            roleId: data.roleId,
            password: data.password ? data.password : null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          toast.success('User updated successfully! 🚀');
        }
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const handleRoles = async () => {
      try {
        const response = await api.get('/Account/Roles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setRoles(response?.data.value);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    handleRoles();
  }, []);

  useEffect(() => {
    if (query.id) {
      const handleUser = async () => {
        const response = await api.get(`/Account/${query.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response?.data.value);
      };
      handleUser();
    }
  }, [query.id]);

  return (
    <Mui.Box
      sx={{
        padding: '24px 32px',
        backgroundColor: '#5c5b5b',
        width: '100%',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 500,
          color: 'var(--white)',
        }}
      >
        Edit user
      </h1>

      <Mui.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <form onSubmit={handleSubmit(updateUser)}>
          <Mui.Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Mui.Box>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  lineHeight: '0px',
                }}
              >
                Name
              </p>

              {user && (
                <Mui.TextField
                  sx={{
                    ...inputStyle,
                    width: '352px',
                  }}
                  size="small"
                  variant="outlined"
                  defaultValue={user.name}
                  {...register('name')}
                />
              )}
            </Mui.Box>
            <Mui.Box>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  lineHeight: '0px',
                }}
              >
                Password
              </p>
              <Mui.TextField
                sx={{
                  ...inputStyle,
                  width: '352px',
                }}
                size="small"
                variant="outlined"
                {...register('password')}
                type="password"
              />
            </Mui.Box>
            <Mui.Box>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  lineHeight: '0px',
                }}
              >
                Channels
              </p>
              <RoleSelect userId={query.id} channelList={user?.channelsList} />
            </Mui.Box>

            <Mui.Box>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--white)',
                  lineHeight: '0px',
                }}
              >
                Role
              </p>
              {roles && user && (
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
                        control={
                          <Mui.Radio
                            checked={user?.role.id === role.id}
                            onChange={e => setUser({ ...user, role })}
                          />
                        }
                        label={role.name}
                        {...register('roleId')}
                      />
                    );
                  })}
                </Mui.RadioGroup>
              )}
            </Mui.Box>
          </Mui.Box>

          <Mui.Box
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginTop: '24px',
            }}
          >
            <Mui.Button
              autoFocus
              variant="contained"
              color="info"
              onClick={() => push('/Users')}
            >
              Return
            </Mui.Button>
            <Mui.Button
              type="submit"
              autoFocus
              variant="contained"
              color="success"
            >
              Agree
            </Mui.Button>
          </Mui.Box>
        </form>
      </Mui.Box>
    </Mui.Box>
  );
}
