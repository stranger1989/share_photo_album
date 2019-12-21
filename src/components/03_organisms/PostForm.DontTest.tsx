import React from 'react';
import { storiesOf } from '@storybook/react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../constants/GlobalUITheme';

import store from '../../store/configureStore';
import { Provider } from 'react-redux';
import PostForm from './PostForm';

storiesOf('./PostForm', module).add('PostForm', () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <PostForm initialValues={{ visible: 'public' }} />
      </Provider>
    </MuiThemeProvider>
  );
});
