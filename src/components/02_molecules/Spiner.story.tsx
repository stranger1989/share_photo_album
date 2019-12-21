import React from 'react';
import { storiesOf } from '@storybook/react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../constants/GlobalUITheme';

import Spiner from './Spiner';

storiesOf('./Spiner', module).add('Spiner', () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Spiner />
    </MuiThemeProvider>
  );
});
