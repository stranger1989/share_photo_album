import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { API, graphqlOperation } from 'aws-amplify';

import Spiner from '../components/02_molecules/Spiner';
import Album from '../components/03_organisms/Album';
import * as albumActions from '../actions/Album';
import { onCreateAlbumPicture, onDeleteAlbum } from '../graphql/Album';

const mapStateToProps = (state: any): any => ({
  albumState: state.album,
});

const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    albumActions: bindActionCreators(albumActions, dispatch),
  };
};

const AlbumContainer: FC<any> = ({ albumState, albumActions }) => {
  const [open, setOpen] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [updateValue, setUpdateValue] = useState([]);

  useEffect(() => {
    (async () => {
      await API.graphql(graphqlOperation(onCreateAlbumPicture)).subscribe({
        next: async () => {
          await albumActions.getAlbumListFunc();
        },
      });
      await API.graphql(graphqlOperation(onDeleteAlbum)).subscribe({
        next: async () => {
          await albumActions.getAlbumListFunc();
        },
      });
      await albumActions.getAlbumListFunc();
    })();
  }, []);

  useEffect(() => {
    if (albumState.isLoaded) {
      setAlbums(albumState.albums);
    }
  }, [albumState.isLoaded]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const albumDelete = async (album: any): Promise<void> => {
    await albumActions.deleteAlbumFunc(albums, album);
  };

  const albumUpdate = async (album: any): Promise<void> => {
    setOpen(false);
    await albumActions.updateAlbumFunc(albums, album);
  };

  return albumState.isLoading ? (
    <Spiner />
  ) : (
    <>
      <Album
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        albums={albumState.albums}
        albumDelete={albumDelete}
        albumUpdate={albumUpdate}
        setUpdateValue={setUpdateValue}
        updateValue={updateValue}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumContainer);
