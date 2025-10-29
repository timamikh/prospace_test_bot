/**
 * Валидаторы форм
 * Last Updated: 29-10-2025
 */

import { PHONE_REGEX, SMS_CODE_LENGTH } from './constants';

/**
 * Валидация номера телефона
 */
export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

/**
 * Валидация SMS кода
 */
export const validateSMSCode = (code: string): boolean => {
  return code.length === SMS_CODE_LENGTH && /^\d+$/.test(code);
};

/**
 * Валидация email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валидация размера файла
 */
export const validateFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes;
};

/**
 * Валидация типа файла
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Валидация обязательного поля
 */
export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Валидация минимальной длины
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Валидация максимальной длины
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Получение сообщения об ошибке валидации
 */
export const getValidationError = (
  fieldName: string,
  validationType: string
): string => {
  const errorMessages: Record<string, string> = {
    required: `Поле "${fieldName}" обязательно для заполнения`,
    phone: 'Введите корректный номер телефона',
    email: 'Введите корректный email адрес',
    smsCode: `SMS код должен содержать ${SMS_CODE_LENGTH} цифр`,
    fileSize: 'Размер файла превышает допустимый',
    fileType: 'Неподдерживаемый тип файла'
  };

  return errorMessages[validationType] || 'Ошибка валидации';
};

