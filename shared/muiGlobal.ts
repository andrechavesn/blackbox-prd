import { ptBR } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme(
  {
    palette: {
      primary: { main: '#2222' },
      secondary: { main: '#f7f7f7' },
    },
    typography: {
      fontFamily: 'JetBrains Mono, sans-serif',
    },
  },
  ptBR,
);
