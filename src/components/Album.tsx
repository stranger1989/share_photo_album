import React from 'react';
import _ from 'lodash';
import { S3Image } from 'aws-amplify-react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 350,
      minWidth: 350,
      marginTop: '20px', // 16:9
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    dummyImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      backgroundColor: 'lightgray',
    },
    setDisplayCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const Album: React.FC<any> = ({ albumState, albums, albumDelete }) => {
  const classes = useStyles();

  return albumState.isLoading ? (
    <Container maxWidth="xl" className={classes.setDisplayCenter} >
      <CircularProgress className={classes.progress} />
    </Container>
  ) :
  (
    <>
      <Container maxWidth="lg">
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
                  subheader={album.createdAt}
                />
                <GridList className={classes.gridList} cols={1}>
                  {album.picture.length === 0 ?
                    (<div className={classes.dummyImage} />) :
                    (_.map(album.picture, (tile: any) => (
                    <GridListTile key={tile.id}>
                      <S3Image
                        level="public"
                        imgKey={tile.file.key}
                        theme={{
                          photoImg: {
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                          },
                        }}
                      />
                      <GridListTileBar
                        title={tile.name}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        actionIcon={
                          <IconButton aria-label={`star ${tile.name}`}>
                            <StarBorderIcon className={classes.title} />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  )))}
                </GridList>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
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
                </CardActions>
              </Card>
            )
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Album;
