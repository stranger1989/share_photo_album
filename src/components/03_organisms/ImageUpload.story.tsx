import React from 'react';
import { storiesOf } from '@storybook/react';

import store from '../../store/configureStore';
import { Provider } from 'react-redux';
import ImageUpload from './ImageUpload';

storiesOf('./ImageUpload', module).add('ImageUpload', () => {
  return (
    <Provider store={store}>
      <ImageUpload
        files={[]}
        updateValue={[]}
        getRootProps={null}
        getInputProps={null}
      />
    </Provider>
  );
});
