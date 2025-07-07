import { Locale } from '@/i18n-config'
import { getDictionary } from '@/dictionaries'
import RegisterForm from '@/components/auth/RegisterForm'

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <RegisterForm dict={dict} lang={lang} />
}
