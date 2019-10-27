import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Album from '../components/Album';
import * as albumActions from '../actions/AlbumAPI';

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

  const albumDelete = (album: any) => {
    albumActions.deleteAlbumFunc(albums, album);
  };

  const update = async (album: any): Promise<void> => {
    // print the form values to the console
    setOpen(false);
    await albumActions.updateAlbumFunc(albums, album);
  };

  return (
    <>
      <Album
        albumState={albumState}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        albums={albumState.albums}
        albumDelete={albumDelete}
        update={update}
        setUpdateValue={setUpdateValue}
        updateValue={updateValue}
      />
    </>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumContainer);
