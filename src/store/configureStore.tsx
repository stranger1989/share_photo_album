import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import amplifyAuthReducer from './reducers/Auth';
import AlbumReducer from './reducers/Album';
import { reducer as reduxFormReducer } from 'redux-form';

const enhancer =
  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

const store = createStore(
  combineReducers({
    auth: amplifyAuthReducer,
    form: reduxFormReducer,
    album: AlbumReducer,
  }),
  enhancer,
);

export default store;
