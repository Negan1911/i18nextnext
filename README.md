# i18nextnext
1i8nextnext will help you to achieve `react-i18next` translations on nextjs,
it does support `SSR` and `SSG`.

## Installation
1. Install packages with your prefered package manager:
```bash
# npm
npm i i18next react-i18next i18nextnext
# or yarn users
yarn add i18next react-i18next i18nextnext
```

2. After constructing your i18n instance, call `setI18n` for allowing us accessing the translation instances, this is typically done under `pages/_app`.
```diff
import i18n from 'i18next'
import { LocaleBackend } from './backend'
import { setI18n } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
export { LoadLocales, LocaleScript, NextNextProvider } from 'i18nextnext'

i18n
  .use(detector)
  .use(LocaleBackend)
  .init({ fallbackLng: 'es', react: { useSuspense: false } })

+ setI18n(i18n)
```

3. Replace `I18nextProvider` with `NextNextProvider` where you initialize react-i18next, this will allow us pre-fill your translations store, this is typically done on the same place as the previous step was done (`pages/_app`):

```diff
import i18n from 'i18next'
import { LocaleBackend } from './backend'
import { setI18n } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
export { LoadLocales, LocaleScript, NextNextProvider } from 'i18nextnext'

i18n
  .use(detector)
  .use(LocaleBackend)
  .init({ fallbackLng: 'es', react: { useSuspense: false } })

setI18n(i18n)

function App({ Component, pageProps }) {
  return (
-    <I18nextProvider i18n={i18n}>
+    <NextNextProvider i18n={i18n}>
      <UIProvider locale="es">
        <Component {...pageProps} />
      </UIProvider>
-     </I18nextProvider>
+     </NextNextProvider>
  )
}

export default App
```

4. Create a custom `pages/_document`, this will allow us to ship the translations
namespaces with the payload received on the UI:

```diff
import React from 'react'
+ import { LocaleScript } from 'i18nextnext'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class AppDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
+          <LocaleScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

5. For preloading translastions, on your `page` file you should add:
SSG:
```js
import { LoadLocales } from 'i18nextnext'

/** Your exported page here **/

export async function getStaticProps() {
  // This will preload various namespaces for a given language.
  await LoadLocales('en', ['dashboard'])
  return {
    props: {},
  }
}
```

SSR:
```js
import { LoadLocales } from 'i18nextnext'

/** Your exported page here **/

export async function getServerSideProps() {
  // This will preload various namespaces for a given language.
  await LoadLocales('en', ['dashboard'])
  return {
    props: {},
  }
}
```

## API

### `<LocaleScript />`:
This will inject a payload on the initial response to the client, allowing i18n to
not request the already-loaded namespaces.
**This is meant to be used on a NextJS Document (`pages/_document`) only.**

**Returns**: If `LoadLocales` was set, will return a `<script />` if not, null.

### `<NextNextProvider i18n={i18n} />`:
Wrapper on top of `I18nextProvider`, it will initialize React-i18next with the pre-filled store from `<LocaleScript />` (if present).

**Returns**: Received Children
**Props**:
- `i18n`: _Required, i18n_: i18n instance.

### `await LoadLocales(lng: string, namespaces: string[])`:
Will pre-load namespaces onto the store, can be used multiple times to load
multiple languages, should be used only on `getServerSideProps` or `getStaticProps`.

**Returns**: _Promise<void>_: An empty promise, fulfilled when resources were loaded.

**Parameters**:
- lng: Language to be used, should match i18n language.
- namespaces: Array of namespaces to be loaded.

## Troubleshooting:

### Translations flashes:
If you don't see any SSR error on the console, most likely you forgot to include `LoadLocales` on your page, that means that fallbacks are being used both on SSR/G and initial page until i18next picks the resources.

### Warning: Text content did not match. Server: <translated> Client: <key fallback>
This is most likely forgot to use `<LocaleScript />` or `<NextNextProvider />`, this means
that there are mismatch between HTML content and their DOM representation.

### Error: i18n has not been set
You forgot to call `setI18n` as expected by our plugin on `LoadLocales`.
