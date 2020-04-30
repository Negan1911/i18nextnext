import * as React from 'react'
import {
  getI18n,
  setI18n,
  I18nextProvider,
  I18nextProviderProps,
} from 'react-i18next'

type ProviderProps = I18nextProviderProps & { children: React.ReactNode }

export function NextNextProvider({ i18n, ...props }: ProviderProps) {
  setI18n(i18n)
  if (globalThis.store) {
    i18n.services.resourceStore.data = globalThis.store
  }

  return <I18nextProvider i18n={i18n} {...props} />
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

  await i18n.reloadResources(lng, namespaces)
  globalThis.store = i18n.services.resourceStore.data
}
