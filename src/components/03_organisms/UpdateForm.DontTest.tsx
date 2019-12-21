import React from 'react';
import { storiesOf } from '@storybook/react';

import store from '../../store/configureStore';
import { Provider } from 'react-redux';
import UpdateForm from './UpdateForm';

const updateValue: any[] = [
  {
    createdAt: '2019-11-17T08:06:18.383Z',
    id: '4015ac50-38b7-46d3-95e2-10f0e8a6c08b',
    note: 'victoria peak',
    owner: 'test',
    picture: [],
    title: 'HongKong',
    visible: 'public',
  },
];

storiesOf('./UpdateForm', module).add('UpdateForm', () => {
  return (
    <Provider store={store}>
      <UpdateForm initialValues={updateValue} />
    </Provider>
  );
});
