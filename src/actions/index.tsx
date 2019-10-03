import { Dispatch } from 'redux';

const apiActionStart: Function = (startActionType: string): any => {
  return {
    type: startActionType as typeof startActionType,
  };
};

const apiActionSuccess: Function = <T extends {}>(successActionType: string, result: T): any => {
  return {
    type: successActionType as typeof successActionType,
    payload: { result },
  };
};

const apiActionFail: Function = <T extends {}>(failActionType: string, error: T): any => {
  return {
    type: failActionType as typeof failActionType,
    payload: { error },
    error: true,
  };
};

export const apiRequestFunc = (
  startActionType: string,
  successActionType: string,
  failActionType: string,
  uniqueLogicFunc: Function,
) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(apiActionStart(startActionType));
    try {
      dispatch(apiActionSuccess(successActionType, await uniqueLogicFunc()));
    } catch (error) {
      dispatch(apiActionFail(failActionType, error));
    }
  };
};
