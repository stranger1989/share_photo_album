import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as AuthActions from '../actions/Auth';
import * as albumActions from '../actions/Album';

import Header from '../components/03_organisms/Header';

const mapStateToProps = (state: any): any => ({
  auth: state.auth,
  albumState: state.album,
});

const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
  };
};

const HeaderContainer: FC<any> = ({
  auth,
  authActions,
  albumState,
  albumActions,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async (values: any) => {
    // print the form values to the console
    setOpen(false);
    await albumActions.createAlbumFunc(albumState.albums, values);
  };

  return (
    <>
      <Header
        auth={auth}
        authActions={authActions}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        submit={submit}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
