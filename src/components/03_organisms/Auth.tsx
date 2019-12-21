import React from 'react';

import LoginForm from '../02_molecules/LoginForm';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import backGroundImage from '../../common/image/auth_background.jpg';

const useStyles = makeStyles(() =>
  createStyles({
    authBackGround: {
      backgroundImage: `url(${backGroundImage})`,
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
    },
  })
);

const Auth: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="xl" className={classes.authBackGround}>
        <LoginForm />
      </Container>
    </>
  );
};

export default Auth;
