import React from 'react';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    setDisplayCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    progress: {
      margin: theme.spacing(2),
    },
  })
);

export const SearchForm: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.setDisplayCenter}>
      <CircularProgress className={classes.progress} />
    </Container>
  );
};

export default SearchForm;
