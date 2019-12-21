import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../constants/GlobalUITheme';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import _ from 'lodash';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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

const colorOptions: any = {
  primary: 'primary',
  secondary: 'secondary',
  inherit: 'inherit',
  default: 'default',
};

const sizeOptions: any = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const ButtonComponent = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <Button
          color={select('Color', colorOptions, colorOptions.primary)}
          size={select('Size', sizeOptions, sizeOptions.medium)}
          disabled={boolean('disabled', false)}
          onClick={action('button-click')}
        >
          {text('Label', 'Menu Button')}
        </Button>
      </ListItem>
      <ListItem>
        <IconButton
          color={select('Color', colorOptions, colorOptions.primary)}
          onClick={action('icon-button-click')}
        >
          <StarBorderIcon />
        </IconButton>
      </ListItem>
    </List>
  );
};

storiesOf('./Button', module).add(
  './Button',
  () => (
    <MuiThemeProvider theme={theme}>
      <ButtonComponent />
    </MuiThemeProvider>
  ),
  {
    info: {
      text: `
          ボタンガイド
        `,
    },
  }
);
