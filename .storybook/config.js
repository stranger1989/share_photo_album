import { configure, addDecorator, addParameters, load } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import requireContext from 'require-context.macro';
import { DocsPage } from '@storybook/addon-docs/blocks';

import '../src/index.css';

const req = requireContext('../src/components', true, /.(story|stories).tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(withKnobs);
  addParameters({
    backgrounds: [
      { name: 'default', value: '#f0f0f0', default: true },
      { name: 'white', value: '#fff' },
      { name: 'black', value: '#000' },
    ],
    docs: DocsPage,
  });
  req.keys().forEach(req);
}

configure(loadStories, module);
