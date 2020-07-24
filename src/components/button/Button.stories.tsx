import * as React from 'react';
import { text } from '@storybook/addon-knobs';

import { Button } from './Button';

//eslint-disable-next-line
export default { title: 'components/Button', component: Button };

export const Demo = () => {
  const children = text('Children', 'Hello Button');

  return <Button>{children}</Button>;
};
