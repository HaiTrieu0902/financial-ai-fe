import { Locale } from '@/i18n-config'
import { getDictionary } from '@/dictionaries'
import LandingPage from '@/components/LandingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Finance AI Assistant',
  description: 'Manage your finances with AI-powered insights',
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <LandingPage dict={dict} lang={lang} />
}
