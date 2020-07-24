import { addDecorator, addParameters } from '@storybook/react';
import { withReactTranslate } from '@rogal/addon-react-translate';
import { withNextRouter } from 'storybook-addon-next-router';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { i18nConfig } from '@config/i18n';

import '!style-loader!css-loader!sass-loader!../src/styles/main.scss';

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
})

addDecorator(
  withNextRouter({
    path: '/',
    asPath: '/',
    query: {},
    push() {}
  })
);

addDecorator(
  withReactTranslate(i18nConfig)
);