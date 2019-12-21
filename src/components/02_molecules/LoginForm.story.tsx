import React from 'react';
import { storiesOf } from '@storybook/react';
import { amplifyConfig } from '../../constants/Auth';

import LoginForm from './LoginForm';

amplifyConfig();

storiesOf('./LoginForm', module).add('LoginForm', () => <LoginForm />);
