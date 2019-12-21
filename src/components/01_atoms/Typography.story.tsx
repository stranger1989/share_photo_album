import React from 'react';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import { storiesOf } from '@storybook/react';

import * as GlobalUIThema from '../../constants/GlobalUITheme';
import MainTitle from '../02_molecules/MainTitle';

const BaseTypography = () => {
  return (
    <List>
      {_.map(GlobalUIThema.typographySize, (size: any) => {
        return (
          <ListItem>
            <Typography variant={size}>{size}. Heading</Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

const MainTypography = () => {
  return (
    <List>
      <MainTitle />
    </List>
  );
};

storiesOf('./Typography', module)
  .add('./mainTypography', () => <MainTypography />, {
    info: {
      text: `
          フォントガイド
        `,
    },
  })
  .add('./baseTypography', () => <BaseTypography />);
