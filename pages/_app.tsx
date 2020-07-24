import * as React from 'react';
import { TranslateProvider } from '@rogal/react-translate';

import { i18nConfig } from '@config/i18n';
import '@styles/main.scss';

type FixMe = any;

interface AppProps {
  Component: FixMe;
  pageProps: FixMe;
}

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <TranslateProvider i18n={i18nConfig}>
      <Component {...pageProps} />
    </TranslateProvider>
  );
}

//eslint-disable-next-line
export default App;