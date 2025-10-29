/**
 * Утилиты для работы с localStorage и Telegram CloudStorage
 * Last Updated: 29-10-2025
 */

import { StorageKeys } from '@types/index';

/**
 * Сохранение данных в localStorage
 */
export const saveToStorage = <T>(key: StorageKeys | string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

/**
 * Получение данных из localStorage
 */
export const getFromStorage = <T>(key: StorageKeys | string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('Error getting from storage:', error);
    return null;
  }
};

/**
 * Удаление данных из localStorage
 */
export const removeFromStorage = (key: StorageKeys | string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
  }
};

/**
 * Очистка всего localStorage
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

/**
 * Проверка наличия ключа в storage
 */
export const hasInStorage = (key: StorageKeys | string): boolean => {
  return localStorage.getItem(key) !== null;
};

/**
 * Сохранение с TTL (Time To Live)
 */
interface StorageItemWithTTL<T> {
  value: T;
  expiry: number;
}

export const saveWithTTL = <T>(
  key: StorageKeys | string,
  value: T,
  ttlMs: number
): void => {
  const now = new Date().getTime();
  const item: StorageItemWithTTL<T> = {
    value,
    expiry: now + ttlMs
  };
  saveToStorage(key, item);
};

export const getWithTTL = <T>(key: StorageKeys | string): T | null => {
  const item = getFromStorage<StorageItemWithTTL<T>>(key);
  if (!item) {
    return null;
  }

  const now = new Date().getTime();
  if (now > item.expiry) {
    removeFromStorage(key);
    return null;
  }

  return item.value;
};

