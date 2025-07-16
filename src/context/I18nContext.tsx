// Client-side i18n context for managing language and dictionary globally
'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Locale } from '@/i18n-config';
import { getClientDictionary } from '@/dictionaries/client';

interface I18nContextType {
  lang: Locale;
  dict: any;
  loading: boolean;
  setLang: (lang: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLang: Locale;
}

export function I18nProvider({ children, initialLang }: I18nProviderProps) {
  const [lang, setLangState] = useState<Locale>(initialLang);
  const [dict, setDict] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadDictionary = async (locale: Locale) => {
    try {
      setLoading(true);
      const dictionary = await getClientDictionary(locale);
      setDict(dictionary);
      setLangState(locale);
    } catch (error) {
      console.error('Error loading dictionary:', error);
      // Fallback to English
      const fallbackDict = await getClientDictionary('en');
      setDict(fallbackDict);
      setLangState('en');
    } finally {
      setLoading(false);
    }
  };

  const setLang = (newLang: Locale) => {
    if (newLang !== lang) {
      loadDictionary(newLang);
    }
  };

  useEffect(() => {
    loadDictionary(initialLang);
  }, [initialLang]);

  const value: I18nContextType = {
    lang,
    dict,
    loading,
    setLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Custom hook to use i18n context
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Helper hook for easy translation access
export function useTranslation() {
  const { dict, lang, loading } = useI18n();

  const t = (key: string) => {
    if (!dict || loading) return key;

    const keys = key.split('.');
    let value = dict;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, lang, loading };
}
