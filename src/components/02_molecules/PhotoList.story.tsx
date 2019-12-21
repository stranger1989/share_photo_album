import React from 'react';
import { storiesOf } from '@storybook/react';
// import * as faker from 'faker';

import PhotoList from './PhotoList';

storiesOf('./PhotoList', module).add('PhotoList', () => {
  const albumMockData: any[] = [
    'city',
    'food',
    'fashion',
    'nature',
    'people',
  ].map(theme => {
    return {
      // id: `${faker.random.alphaNumeric(20)}`,
      // name: `${faker.lorem.sentence()}`,
      id: 'jfoajfoajoefaojaseo',
      name: 'testphoto',
      file: {
        // key: `${faker.image.imageUrl(400, 400, theme)}`,
        key: '',
      },
    };
  });

  return <PhotoList picture={albumMockData} isMock={true} />;
});
