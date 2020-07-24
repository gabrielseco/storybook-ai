import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// eslint-disable-next-line
export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Varta:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
