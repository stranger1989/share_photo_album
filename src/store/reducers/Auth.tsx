import { Reducer } from 'redux';
import * as AuthActionType from '../../constants/Auth';

export interface AuthState {
  user: any | null;
  isLoading: boolean;
  error?: any | null;
}

export const initialState = {
  user: null,
  isLoading: false,
  isLoaded: false,
};

const amplifyAuthReducer: Reducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case AuthActionType.FETCH_SESSION_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case AuthActionType.FETCH_SESSION_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.result.user,
      };
    case AuthActionType.FETCH_SESSION_FAIL:
      return { ...state, isLoading: false, isError: true };
    case AuthActionType.FETCH_SIGNOUT_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case AuthActionType.FETCH_SIGNOUT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: null,
      };
    case AuthActionType.FETCH_SIGNOUT_FAIL:
      return { ...state, isLoading: false, isError: true };
    case AuthActionType.AUTH_INITIALIZE:
      return { ...state, user: null };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const _: never = action;

      return state;
    }
  }
};

export default amplifyAuthReducer;
