import React from 'react';

import Typography from '@material-ui/core/Typography';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      display: 'none',
      textAlign: 'center',
      fontFamily: 'Nanum Brush Script',
      fontSize: '40px',
      opacity: 0.6,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  })
);

export const MainTitle: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h6" noWrap>
      Share Photo Album
    </Typography>
  );
};

export default MainTitle;
