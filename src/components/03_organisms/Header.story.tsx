/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../constants/GlobalUITheme';

import Header from './Header';

const authNotLogin = {
  user: null,
  isLoading: false,
  isLoaded: false,
};

const authLogin = {
  user: [],
  isLoading: false,
  isLoaded: true,
};

storiesOf('./HeaderNotLogin', module).add(
  'HeaderNotLogin',
  () => (
    <MuiThemeProvider theme={theme}>
      <Header
        auth={authNotLogin}
        authActions={null}
        open={null}
        handleClickOpen={null}
        handleClose={null}
        submit={null}
      />
    </MuiThemeProvider>
  ),
  {
    info: {
      text: `
          description or documentation about my component, supports markdown
          ~~~js
          <Button>Click Here</Button>
          ~~~
        `,
    },
  }
);

storiesOf('./HeaderLogin', module).add('HeaderLogin', () => (
  <MuiThemeProvider theme={theme}>
    <Header
      auth={authLogin}
      authActions={null}
      open={null}
      handleClickOpen={null}
      handleClose={null}
      submit={null}
    />
  </MuiThemeProvider>
));
