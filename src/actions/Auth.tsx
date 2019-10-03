import { Auth } from 'aws-amplify';
import { apiRequestFunc } from './index';
import * as AuthActionType from '../constants/Auth';

export const fetchSessionData = (isMounted: boolean): any => {
  const uniqueLogicFunc: Function = async () => {
    const data = await Auth.currentAuthenticatedUser();
    if (data) {
      return { user: data };
    }

    return { user: null };
  };
  if (isMounted) {
    return apiRequestFunc(
      AuthActionType.FETCH_SESSION_START,
      AuthActionType.FETCH_SESSION_SUCCEED,
      AuthActionType.FETCH_SESSION_FAIL,
      uniqueLogicFunc,
    );
  }
};

export const handleSignout = (): void => {
  const uniqueLogicFunc: Function = async (): Promise<object> => {
    const data = await Auth.signOut();

    return { user: data };
  };
  apiRequestFunc(
    AuthActionType.FETCH_SIGNOUT_START,
    AuthActionType.FETCH_SIGNOUT_SUCCEED,
    AuthActionType.FETCH_SIGNOUT_FAIL,
    uniqueLogicFunc,
  );
};
