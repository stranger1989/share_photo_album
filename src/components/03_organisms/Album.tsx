import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import {
  Container,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import UpdateForm from './UpdateForm';
import PhotoList from '../02_molecules/PhotoList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 350,
      minWidth: 350,
      marginTop: '20px',
    },
    avatar: {
      backgroundColor: theme.palette.grey[700],
    },
  })
);

const Album: React.FC<any> = ({
  open,
  handleClickOpen,
  handleClose,
  albums,
  albumDelete,
  albumUpdate,
  setUpdateValue,
  updateValue,
}) => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <Box mt={'70px'}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
          >
            {_.map(albums, (album: any) => {
              return (
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {album.owner}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={album.title}
                    subheader={moment(album.createdAt).format(
                      'YYYY-MM-DD HH:mm'
                    )}
                  />
                  <PhotoList picture={album.picture} />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {album.note}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="delete"
                      onClick={() => albumDelete(album)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        handleClickOpen();
                        setUpdateValue(album);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                      maxWidth="sm"
                      fullWidth
                    >
                      <DialogTitle id="form-dialog-title">
                        Update Album
                      </DialogTitle>
                      <DialogContent>
                        <UpdateForm
                          onSubmit={albumUpdate}
                          initialValues={updateValue}
                        />
                      </DialogContent>
                    </Dialog>
                  </CardActions>
                </Card>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Album;
