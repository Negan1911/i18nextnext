import React from 'react'
import i18n from 'i18next'
import { setI18n } from 'react-i18next'
import { NextNextProvider } from '../..'
import detector from 'i18next-browser-languagedetector'

i18n
  .use(detector)
  .init({ fallbackLng: 'es', react: { useSuspense: false } })

// This should be replaced with a proper backend ☝️.
i18n.addResourceBundle('en', 'start', {
  title: 'i18nextnext',
  examples: 'Examples',
  ssr: 'SSR',
  ssg: 'SSG',
})

i18n.addResourceBundle('en', 'details', {
  back: 'Back',
  ssr_title: 'Hello, World from SSR',
  ssg_title: 'Hello, World from SSG',
})

setI18n(i18n)

function App({ Component, pageProps }) {
  return (
    <NextNextProvider i18n={i18n}>
      <Component {...pageProps} />
    </NextNextProvider>
  )
}

export default App
