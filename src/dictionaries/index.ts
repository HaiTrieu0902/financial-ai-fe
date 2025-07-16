import 'server-only';
import type { Locale } from '@/i18n-config';

const dictionaries = {
  en: () => import('./en').then((module) => module.default),
  es: () => import('./es').then((module) => module.default),
  fr: () => import('./fr').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const dictionary = dictionaries[locale];
  if (!dictionary) {
    console.error(`Dictionary not found for locale: ${locale}`);
    return dictionaries.en(); // fallback to English
  }
  return dictionary();
};
