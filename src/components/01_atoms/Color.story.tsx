import React from 'react';
import _ from 'lodash';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { storiesOf } from '@storybook/react';

import * as GlobalUIThema from '../../constants/GlobalUITheme';

const baseColorArray = _.defaults(
  {},
  ..._.map(
    Object.assign(GlobalUIThema.theme.palette.grey),
    (colorCode: string, index: number) => {
      return {
        [`base-color-${index}`]: {
          backgroundColor: colorCode,
        },
      };
    }
  )
);

const mainColorArray = _.defaults(
  {},
  ..._.map(
    Object.assign(GlobalUIThema.theme.palette.primary),
    (colorCode: string, index: number) => {
      return {
        [`main-color-${index}`]: {
          backgroundColor: colorCode,
        },
      };
    }
  )
);

const accentColorArray = _.defaults(
  {},
  ..._.map(
    Object.assign(GlobalUIThema.theme.palette.secondary),
    (colorCode: string, index: number) => {
      return {
        [`accent-color-${index}`]: {
          backgroundColor: colorCode,
        },
      };
    }
  )
);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: GlobalUIThema.theme.palette.background.paper,
    },
    ...baseColorArray,
    ...mainColorArray,
    ...accentColorArray,
  })
);

const makeColorComponent = (pallette: any, useTheme: string, classes: any) => {
  return (
    <List className={classes.root}>
      {_.map(Object.assign(pallette), (colorCode: string, index: string) => {
        return (
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={classes[`${useTheme}-color-${index}`]}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${useTheme}-color-${index}`}
              secondary={`${colorCode}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const BaseColorList = () => {
  const classes = useStyles();
  return makeColorComponent(GlobalUIThema.theme.palette.grey, 'base', classes);
};

const MainColorList = () => {
  const classes = useStyles();
  return makeColorComponent(
    GlobalUIThema.theme.palette.primary,
    'main',
    classes
  );
};

const AccentColorList = () => {
  const classes = useStyles();
  return makeColorComponent(
    GlobalUIThema.theme.palette.secondary,
    'accent',
    classes
  );
};

storiesOf('./Color', module)
  .add('./baseColor', () => <BaseColorList />, {
    info: {
      text: `
          カラーガイド
        `,
    },
  })
  .add('./mainColor', () => <MainColorList />)
  .add('./accentColor', () => <AccentColorList />);
