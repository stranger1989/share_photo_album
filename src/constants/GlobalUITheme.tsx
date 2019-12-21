import { createMuiTheme, Theme } from '@material-ui/core/styles';

// Color
export const customColorVariation = ['main', 'light', 'dark'];

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7383A2',
      main: '#445577',
      dark: '#002f6c',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#FF6428',
      main: '#FF9678',
      dark: '#c41c00',
      contrastText: '#FFF',
    },
  },
});

// Typography

export const typographySize = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
];
