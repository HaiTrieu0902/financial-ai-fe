// src/hooks/useLocalStorageSync.js (hoặc .ts nếu dùng TypeScript)

import { KEY_LOCALSTORAGE_SYNC } from '@/constants';
import { useEffect, useState } from 'react';

/**
 * useLocalStorageSync - React hook for syncing state with localStorage
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - The default value if not found in localStorage
 * @returns {[any, Function, Function, Function]} [value, setValue, removeValue, getValue]
 */
export function useLocalStorageSync<T>(key: string, defaultValue: T | null): [T | null, (val: T) => void, () => void, () => T | null] {
  const [value, setValueState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return defaultValue;
      return key === KEY_LOCALSTORAGE_SYNC.token ? stored : JSON.parse(stored);
    } catch (e) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const setValue = (val: T) => {
    setValueState(val);
  };

  const removeValue = () => {
    setValueState(null);
    localStorage.removeItem(key);
  };

  const getValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  };

  return [value, setValue, removeValue, getValue];
}
