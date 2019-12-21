import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Hub } from 'aws-amplify';

import * as AuthActions from '../actions/Auth';
import * as albumActions from '../actions/Album';
import Album from './Album';
import Header from './Header';
import Auth from '../components/03_organisms/Auth';

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

const AppContainer: FC<any> = ({ auth, authActions, albumActions }) => {
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
    <>
      <Header />
      {!auth.user ? (
        <Auth />
      ) : (
        <div>
          <Album />
        </div>
      )}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
