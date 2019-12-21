import { Reducer } from 'redux';
import * as AlbumAPIActionType from '../../constants/Album';

export interface AlbumApiState {
  albums: any;
  isLoading: boolean;
  isLoaded: boolean;
  error?: any;
}

export const initialState: AlbumApiState = {
  albums: [],
  isLoading: false,
  isLoaded: false,
};

const apiReducer: Reducer<AlbumApiState> = (
  state: AlbumApiState = initialState,
  action: any
): AlbumApiState => {
  switch (action.type) {
    case AlbumAPIActionType.LIST_ALBUMS_START:
    case AlbumAPIActionType.CREATE_ALBUM_START:
    case AlbumAPIActionType.UPDATE_ALBUM_START:
    case AlbumAPIActionType.DELETE_ALBUM_START:
      return {
        ...state,
        albums: [],
        isLoading: true,
        isLoaded: false,
      };
    case AlbumAPIActionType.LIST_ALBUMS_SUCCEED:
    case AlbumAPIActionType.CREATE_ALBUM_SUCCEED:
    case AlbumAPIActionType.UPDATE_ALBUM_SUCCEED:
    case AlbumAPIActionType.DELETE_ALBUM_SUCCEED:
      return {
        ...state,
        albums: action.payload.result,
        isLoading: false,
        isLoaded: true,
      };
    case AlbumAPIActionType.LIST_ALBUMS_FAIL:
    case AlbumAPIActionType.CREATE_ALBUM_FAIL:
    case AlbumAPIActionType.UPDATE_ALBUM_FAIL:
    case AlbumAPIActionType.DELETE_ALBUM_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: {
      return state;
    }
  }
};

export default apiReducer;
