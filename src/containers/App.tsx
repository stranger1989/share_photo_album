import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Hub } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

import * as AuthActions from '../actions/Auth';
import Album from './Album';
import Header from './Header';

const mapStateToProps = (state: any): any => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

// const text = 'text message is ...';

const AppContainer: FC<any> = ({ auth, authActions }) => {
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const onAuthEvent = (payload: any): void => {
      switch (payload.event) {
        case 'signIn':
          setTriggerFetch(true);
          break;
        case 'signOut':
          setTriggerFetch(false);
          break;
        default:
      }
    };

    const HubListener = (): void => {
      Hub.listen('auth', data => {
        const { payload } = data;
        onAuthEvent(payload);
      });
    };

    HubListener();
    authActions.fetchSessionData(isMounted);

    return (): void => {
      Hub.remove('auth', () => {});
      isMounted = false;
    };
  }, [triggerFetch]);

  return (
    <div>
      <Header />
      {!auth.user ? (
        <Authenticator />
      ) : (
        <div>
          <Album />
        </div>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
