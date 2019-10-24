import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import _ from 'lodash';
import uuid from 'uuid/v4';
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

const createAlbum = `mutation createAlbum($createAlbuminput: CreateAlbumInput!) {
  createAlbum(input: $createAlbuminput) {
    id
    title
    visible
    note
    owner
    createdAt
  }
}`;

const deleteAlbum = `mutation deleteAlbum($deleteAlbuminput: DeleteAlbumInput!) {
  deleteAlbum(input: $deleteAlbuminput) {
    id
  }
}`;

const createAlbumPicture = `mutation createAlbumPicture($createAlbumPictureinput: CreateAlbumPictureInput!) {
  createAlbumPicture(input: $createAlbumPictureinput) {
    id
    name
    albumId
    file {
      bucket
      region
      key
    }
    createdAt
  }
}`;

const deletePicture = `mutation deleteAlbumPicture($deleteAlbumPictureinput: DeleteAlbumPictureInput!) {
  deleteAlbumPicture(input: $deleteAlbumPictureinput) {
    id
  }
}`;

export const getAlbumListFunc = () => {
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

export const createAlbumFunc = (albums: any, values: any) => {
  const uniqueLogicFunc = async () => {
    const loginInfo = await Auth.currentUserInfo();

    const albumInfo = await API.graphql(
      graphqlOperation(createAlbum, {
        createAlbuminput: {
          title: values.title,
          visible: values.visible,
          note: values.notes,
          owner: loginInfo.username,
          createdAt: new Date().toISOString(),
        },
      }),
    );

    if (values.imageToUpload.length !== 0) {
      albumInfo.data.createAlbum.picture = await Promise.all(
        _.map(values.imageToUpload, async (image: any) => {
          const S3image: any = await Storage.put(uuid(), image, {
            contentType: image.type,
          });

          const Photo: any = await API.graphql(
            graphqlOperation(createAlbumPicture, {
              createAlbumPictureinput: {
                name: image.name,
                albumId: albumInfo.data.createAlbum.id,
                file: {
                  bucket: process.env.REACT_APP_S3_BUCKET,
                  region: process.env.REACT_APP_REGION,
                  key: S3image.key,
                },
                createdAt: new Date().toISOString(),
              },
            }),
          );

          return Photo.data.createAlbumPicture;
        }),
      );
    } else {
      albumInfo.data.createAlbum.picture = null;
    }

    return [...albums, albumInfo.data.createAlbum];
  };

  return apiRequestFunc(
    AlbumAPIActionType.CREATE_ALBUM_START,
    AlbumAPIActionType.CREATE_ALBUM_SUCCEED,
    AlbumAPIActionType.CREATE_ALBUM_FAIL,
    uniqueLogicFunc,
  );
};

export const deleteAlbumFunc = (albums: any, album: any): any => {
  const uniqueLogicFunc = async () => {
    const deleteId = await API.graphql(
      graphqlOperation(deleteAlbum, {
        deleteAlbuminput: {
          id: album.id,
        },
      }),
    );

    return _.compact(await Promise.all(
      _.map(albums, async (value: any) => {
        if (value.id === deleteId.data.deleteAlbum.id) {
          await Promise.all(
            _.map(value.picture, async (picture: any) => {
              await Storage.remove(picture.file.key, { level: 'public' });

              return API.graphql(
                graphqlOperation(deletePicture, {
                  deleteAlbumPictureinput: {
                    id: picture.id,
                  },
                }),
              );
            }),
          );
          return '';
        } else {
          return value;
        }
      })));
  };

  return apiRequestFunc(
    AlbumAPIActionType.DELETE_ALBUM_START,
    AlbumAPIActionType.DELETE_ALBUM_SUCCEED,
    AlbumAPIActionType.DELETE_ALBUM_FAIL,
    uniqueLogicFunc,
  );
};
