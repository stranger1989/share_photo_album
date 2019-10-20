import { API, graphqlOperation } from 'aws-amplify';
import { apiRequestFunc } from './index';
import * as AlbumAPIActionType from '../constants/AlbumAPI';

const listAlbums = `query listAlbums {
  listAlbums {
    items {
      id
      title
      visible
      note
      owner
      createdAt
      picture {
        id
        name
        file{
          key
        }
      }
    }
  }
}`;

export const getAlbumList = () => {
  const uniqueLogicFunc = async () => {
    return API.graphql(graphqlOperation(listAlbums))
      .then((response: any) => response.data.listAlbums.items);
  };

  return apiRequestFunc(
    AlbumAPIActionType.LIST_ALBUMS_START,
    AlbumAPIActionType.LIST_ALBUMS_SUCCEED,
    AlbumAPIActionType.LIST_ALBUMS_FAIL,
    uniqueLogicFunc,
  );
};
