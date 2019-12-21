import React from 'react';
import { storiesOf } from '@storybook/react';
// import * as faker from 'faker';

import Album from './Album';

storiesOf('./Album', module).add('Album', () => {
  const albumMockData: any[] = [...Array(3)].map(() => {
    return {
      // createdAt: `${faker.date.past(10)}`,
      // id: `${faker.random.alphaNumeric(20)}`,
      // note: `${faker.lorem.sentences(3)}`,
      createdAt: '2019-12-01',
      id: 'frfaeffgeaafa',
      note: 'testtest',
      owner: 'test',
      picture: [],
      // title: `${faker.company.catchPhrase()}`,
      title: 'test',
      visible: 'public',
    };
  });

  return (
    <Album
      open={null}
      handleClickOpen={null}
      handleClose={null}
      albums={albumMockData}
      albumDelete={null}
      update={null}
      setUpdateValue={null}
      updateValue={null}
    />
  );
});
