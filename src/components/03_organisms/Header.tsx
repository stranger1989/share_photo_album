import React from 'react';

import SearchForm from '../02_molecules/SearchForm';
import MainTitle from '../02_molecules/MainTitle';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostForm from './PostForm';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      opacity: 0.8,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const Header: React.FC<any> = ({
  auth,
  authActions,
  open,
  handleClickOpen,
  handleClose,
  submit,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          {!auth.user ? null : (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
          <MainTitle />
          {!auth.user ? null : (
            <>
              <SearchForm />
              <Box mx={3}>
                <Button color="inherit" onClick={handleClickOpen}>
                  Post Album
                </Button>
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle id="form-dialog-title">Post Album</DialogTitle>
                <DialogContent>
                  <PostForm
                    onSubmit={submit}
                    initialValues={{ visible: 'public' }}
                  />
                </DialogContent>
              </Dialog>
              <Button
                color="inherit"
                data-test="sign-out-button"
                onClick={(): void => authActions.handleSignout()}
              >
                Signout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
