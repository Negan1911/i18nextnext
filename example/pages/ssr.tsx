import React from 'react'
import Link from 'next/link'
import { LoadLocales } from '../..'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const [t] = useTranslation('details')
  return <div>
    <h1>{t('ssr_title')}</h1>
    <Link href="/"><a>{t('back')}</a></Link>
  </div>
}

export async function getServerSideProps() {
  await LoadLocales('es', ['details'])
  return {
    props: {},
  }
}
