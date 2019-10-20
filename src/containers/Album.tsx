import React, { FC, useEffect } from 'react';
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
  useEffect(() => {
    albumActions.getAlbumListFunc();
  }, []);

  return (
    <>
      <Album albumState={albumState} albums={albumState.albums} />
    </>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumContainer);
