/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
// import camelcaseKeys from 'camelcase-keys';

import App from './App';

storiesOf('./App', module).add('./App', () => <App text={object('text', 'text')} />);
