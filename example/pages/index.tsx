import React from 'react'
import Link from 'next/link'
import { LoadLocales } from '../..'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const [t] = useTranslation('start')
  return <div>
    <h1>{t('title')}</h1>
    <p>{t('examples')}</p>
    <ul>
      <li><Link href="/ssr"><a>{t('ssr')}</a></Link></li>
      <li><Link href="/ssg"><a>{t('ssg')}</a></Link></li>
    </ul>
  </div>
}

export async function getStaticProps() {
  await LoadLocales('es', ['start'])
  return {
    props: {},
  }
}
