import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5a5e',
      light: '#ff867c',
      dark: '#b61827',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#1de9b6',
      light: '#6effe8',
      dark: '#00b686',
      contrastText: '#fafafa',
    },
    divider: 'rgba(0,0,0,0.36)',
  },
});

export default theme;
