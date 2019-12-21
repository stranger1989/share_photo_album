import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { amplifyConfig } from './constants/Auth';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './constants/GlobalUITheme';

amplifyConfig();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
