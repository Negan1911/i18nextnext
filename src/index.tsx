import * as React from 'react';
import { i18n } from 'i18next';
import { I18nextProvider, getI18n, setI18n } from 'react-i18next'

type LocalesProviderProps = { i18n: i18n, children: React.ReactElement }

export function NextNextProvider({ children, i18n }: LocalesProviderProps) {
  setI18n(i18n)
  if (globalThis.store) {
    i18n.services.resourceStore.data = globalThis.store
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export function LocaleScript() {
  if (globalThis.store) {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.store = ${JSON.stringify(globalThis.store)}`,
        }}
      />
    )
  }
  return null
}

export async function LoadLocales(lng: string, namespaces: string[]) {
  const i18n = getI18n()
  if (!i18n) {
    throw new Error('i18n has not been set')
  }

  await i18n.reloadResources(lng, namespaces);
  globalThis.store = i18n.services.resourceStore.data
}
