import * as Mui from '@mui/material';
import { useContext } from 'react';
import { GoSignOut } from 'react-icons/go';
import { AuthContext } from '../../contexts/AuthContext';

export function FloatButton() {
  const { signOut } = useContext(AuthContext);
  return (
    <Mui.Tooltip title="Logout" arrow>
      <Mui.Box
        onClick={signOut}
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 32,
          zIndex: 1000,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
          svg: {
            width: 48,
            height: 48,
            color: 'var(--white)',
            transition: '0.3s',
            cursor: 'pointer',

            '&:hover': {
              color: 'var(--red)',
            },
          },
        }}
      >
        <GoSignOut />
      </Mui.Box>
    </Mui.Tooltip>
  );
}
