import React, { FC } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';

import App from '../components/App';

// const mapStateToProps = (state: any): any => ({
//   auth: state.auth,
// });

// const mapDispatchToProps = (dispatch: Dispatch): any => {
//   return {
//     authActions: bindActionCreators(AuthActions, dispatch),
//   };
// };

const AppContainer: FC = () => {
  return <App />;
};

export default connect()(AppContainer);
// mapStateToProps,
// mapDispatchToProps,
