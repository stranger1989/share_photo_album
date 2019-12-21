import React from 'react';
import _ from 'lodash';
import { S3Image } from 'aws-amplify-react';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.grey[100],
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
  })
);

export const PhotoList: React.FC<{ picture: any[]; isMock?: boolean }> = ({
  picture,
  isMock,
}) => {
  const classes = useStyles();

  return (
    <>
      <GridList className={classes.gridList} cols={1}>
        {picture.length === 0 ? (
          <div className={classes.dummyImage} />
        ) : (
          _.map(picture, (tile: any) => (
            <GridListTile key={tile.id}>
              {!isMock ? (
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
              ) : (
                <img
                  src={tile.file.key}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
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
          ))
        )}
      </GridList>
    </>
  );
};

export default PhotoList;
