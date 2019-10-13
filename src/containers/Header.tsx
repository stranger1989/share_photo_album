import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as AuthActions from '../actions/Auth';
import Header from '../components/Header';

const mapStateToProps = (state: any): any => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

const HeaderContainer: FC<any> = ({ auth, authActions }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    // print the form values to the console
    setOpen(false);
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
  mapDispatchToProps,
)(HeaderContainer);
