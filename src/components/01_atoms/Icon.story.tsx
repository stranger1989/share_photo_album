import React from 'react';
import _ from 'lodash';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ImageIcon from '@material-ui/icons/Image';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { storiesOf } from '@storybook/react';

import * as GlobalUIThema from '../../constants/GlobalUITheme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: GlobalUIThema.theme.palette.background.paper,
    },
  })
);

const iconList: JSX.Element[] = [
  <MenuIcon />,
  <SearchIcon />,
  <Delete />,
  <EditIcon />,
  <MoreVertIcon />,
  <StarBorderIcon />,
  <ImageIcon />,
];

const IconComponent = () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {_.map(iconList, component => {
        return (
          <ListItem>
            <ListItemAvatar>
              <Avatar>{component}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${component.type.displayName}`}
              secondary={`${component.type.muiName}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

storiesOf('./Icon', module).add('./Icon', () => <IconComponent />, {
  info: {
    text: `
          アイコンガイド
        `,
  },
});
