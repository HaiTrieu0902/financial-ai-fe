import type { Locale } from '@/i18n-config';

// Client-side dictionary loader (without server-only)
const clientDictionaries = {
  en: () => import('./en').then((module) => module.default),
  es: () => import('./es').then((module) => module.default),
  fr: () => import('./fr').then((module) => module.default),
};

export const getClientDictionary = async (locale: Locale) => {
  const dictionary = clientDictionaries[locale];
  if (!dictionary) {
    console.error(`Dictionary not found for locale: ${locale}`);
    return clientDictionaries.en(); // fallback to English
  }
  return dictionary();
};
