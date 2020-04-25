import React from 'react'
import { LocaleScript } from '../..'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <LocaleScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
