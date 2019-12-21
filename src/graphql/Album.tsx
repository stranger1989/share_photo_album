export const listAlbums = `query listAlbums {
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

export const createAlbum = `mutation createAlbum($createAlbuminput: CreateAlbumInput!) {
  createAlbum(input: $createAlbuminput) {
    id
    title
    visible
    note
    owner
    createdAt
  }
}`;

export const updateAlbum = `mutation updateAlbum($updateAlbuminput: UpdateAlbumInput!) {
  updateAlbum(input: $updateAlbuminput) {
    id
    title
    visible
    note
    owner
    createdAt
  }
}`;

export const deleteAlbum = `mutation deleteAlbum($deleteAlbuminput: DeleteAlbumInput!) {
  deleteAlbum(input: $deleteAlbuminput) {
    id
  }
}`;

export const createAlbumPicture = `mutation createAlbumPicture($createAlbumPictureinput: CreateAlbumPictureInput!) {
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

export const deletePicture = `mutation deleteAlbumPicture($deleteAlbumPictureinput: DeleteAlbumPictureInput!) {
  deleteAlbumPicture(input: $deleteAlbumPictureinput) {
    id
  }
}`;

export const onCreateAlbumPicture = `subscription onCreateAlbumPictureSub {
  onCreateAlbumPicture {
      __typename
      id
      albumId
      name
      createdAt
  }
}`;

export const onDeleteAlbum = `subscription onDeleteAlbumSub {
  onDeleteAlbum {
      __typename
      id
  }
}`;
