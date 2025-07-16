// src/hooks/useLocalStorageSync.js (hoặc .ts nếu dùng TypeScript)

import { KEY_LOCALSTORAGE_SYNC } from '@/constants';
import { useEffect, useState } from 'react';

/**
 * useLocalStorageSync - React hook for syncing state with localStorage
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - The default value if not found in localStorage
 * @returns {[any, Function, Function, Function]} [value, setValue, removeValue, getValue]
 */
export function useLocalStorageSync<T>(
  key: string,
  defaultValue: T | null,
): [T | null, (val: T) => void, () => void, () => T | null] {
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
      // For token, store as plain string. For other values, stringify them.
      const valueToStore = key === KEY_LOCALSTORAGE_SYNC.token ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore as string);
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
      if (!item) return null;

      // For token, return as plain string. For other values, parse JSON.
      return key === KEY_LOCALSTORAGE_SYNC.token ? item : JSON.parse(item);
    } catch (e) {
      return null;
    }
  };

  return [value, setValue, removeValue, getValue];
}
