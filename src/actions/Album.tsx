import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { apiRequestFunc } from './index';
import {
  listAlbums,
  createAlbum,
  createAlbumPicture,
  updateAlbum,
  deleteAlbum,
  deletePicture,
} from '../graphql/Album';
import * as AlbumAPIActionType from '../constants/Album';

export const getAlbumListFunc = () => {
  const uniqueLogicFunc = async () => {
    return API.graphql(graphqlOperation(listAlbums)).then(
      (response: any) => response.data.listAlbums.items
    );
  };

  return apiRequestFunc(
    AlbumAPIActionType.LIST_ALBUMS_START,
    AlbumAPIActionType.LIST_ALBUMS_SUCCEED,
    AlbumAPIActionType.LIST_ALBUMS_FAIL,
    uniqueLogicFunc
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
      })
    );

    if (values.imageToUpload.length !== 0) {
      albumInfo.data.createAlbum.picture = await Promise.all(
        _.map(values.imageToUpload, async (image: any) => {
          const S3image: any = await Storage.put(uuid(), image, {
            contentType: image.type,
          });

          const picture: any = await API.graphql(
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
            })
          );

          return picture.data.createAlbumPicture;
        })
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
    uniqueLogicFunc
  );
};

export const updateAlbumFunc = (albums: any, album: any): any => {
  const uniqueLogicFunc = async () => {
    const albumInfo = await API.graphql(
      graphqlOperation(updateAlbum, {
        updateAlbuminput: {
          id: album.id,
          title: album.title,
          visible: album.visible,
          note: album.note,
          owner: album.username,
          createdAt: new Date().toISOString(),
        },
      })
    ).then((response: any) => response.data.updateAlbum);

    let updatePicture = album.picture;

    const removeAlbums: any[] = _.compact(
      await Promise.all(
        _.map(albums, async (updateAlbum: any) => {
          if (updateAlbum.id === albumInfo.id) {
            // if the initial picture array is different from updateed one.
            if (updateAlbum.picture !== album.picture) {
              // delete initial picure from aws DB & S3
              await Promise.all(
                _.map(updateAlbum.picture, async (picture: any) => {
                  await Storage.remove(picture.file.key, { level: 'public' });

                  return API.graphql(
                    graphqlOperation(deletePicture, {
                      deleteAlbumPictureinput: {
                        id: picture.id,
                      },
                    })
                  );
                })
              );

              // create updated picure into aws DB & S3
              if (album.picture.length !== 0) {
                updatePicture = await Promise.all(
                  _.map(album.picture, async (image: any) => {
                    const S3image: any = await Storage.put(uuid(), image, {
                      contentType: image.type,
                    });

                    const picture: any = await API.graphql(
                      graphqlOperation(createAlbumPicture, {
                        createAlbumPictureinput: {
                          name: image.name,
                          albumId: albumInfo.id,
                          file: {
                            bucket: process.env.REACT_APP_S3_BUCKET,
                            region: process.env.REACT_APP_REGION,
                            key: S3image.key,
                          },
                          createdAt: new Date().toISOString(),
                        },
                      })
                    );

                    return picture.data.createAlbumPicture;
                  })
                );
              }
            }

            return '';
          } else {
            return updateAlbum;
          }
        })
      )
    );

    albumInfo.picture = updatePicture;

    return [...removeAlbums, albumInfo];
  };

  return apiRequestFunc(
    AlbumAPIActionType.UPDATE_ALBUM_START,
    AlbumAPIActionType.UPDATE_ALBUM_SUCCEED,
    AlbumAPIActionType.UPDATE_ALBUM_FAIL,
    uniqueLogicFunc
  );
};

export const deleteAlbumFunc = (albums: any, album: any): any => {
  const uniqueLogicFunc = async () => {
    const deleteId = await API.graphql(
      graphqlOperation(deleteAlbum, {
        deleteAlbuminput: {
          id: album.id,
        },
      })
    );

    return _.compact(
      await Promise.all(
        _.map(albums, async (deleteAlbum: any) => {
          if (deleteAlbum.id === deleteId.data.deleteAlbum.id) {
            await Promise.all(
              _.map(deleteAlbum.picture, async (picture: any) => {
                await Storage.remove(picture.file.key, { level: 'public' });

                return API.graphql(
                  graphqlOperation(deletePicture, {
                    deleteAlbumPictureinput: {
                      id: picture.id,
                    },
                  })
                );
              })
            );
            return '';
          } else {
            return deleteAlbum;
          }
        })
      )
    );
  };

  return apiRequestFunc(
    AlbumAPIActionType.DELETE_ALBUM_START,
    AlbumAPIActionType.DELETE_ALBUM_SUCCEED,
    AlbumAPIActionType.DELETE_ALBUM_FAIL,
    uniqueLogicFunc
  );
};
