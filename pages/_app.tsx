import * as React from 'react';

import '@styles/main.scss';

type FixMe = any;

interface AppProps {
  Component: FixMe;
  pageProps: FixMe;
}

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

//eslint-disable-next-line
export default App;