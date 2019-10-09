import React, { FC } from 'react';
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
  return (
    <>
      <Header auth={auth} authActions={authActions} />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
