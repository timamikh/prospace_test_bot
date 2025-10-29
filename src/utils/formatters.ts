/**
 * Форматтеры данных
 * Last Updated: 29-10-2025
 */

import { format, formatDistance, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Форматирование даты и времени
 */
export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd.MM.yyyy HH:mm', { locale: ru });
};

/**
 * Форматирование только даты
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd.MM.yyyy', { locale: ru });
};

/**
 * Форматирование только времени
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'HH:mm', { locale: ru });
};

/**
 * Относительное время (2 часа назад, через 3 дня)
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true, locale: ru });
};

/**
 * Относительная дата (вчера в 14:30, завтра в 09:00)
 */
export const formatRelativeDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatRelative(d, new Date(), { locale: ru });
};

/**
 * Форматирование размера файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Форматирование номера телефона
 */
export const formatPhoneNumber = (phone: string): string => {
  // Удаляем все нечисловые символы
  const cleaned = phone.replace(/\D/g, '');
  
  // Форматируем в зависимости от длины
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  
  return phone;
};

/**
 * Форматирование расстояния
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} м`;
  }
  return `${(meters / 1000).toFixed(1)} км`;
};

/**
 * Форматирование веса
 */
export const formatWeight = (kg: number): string => {
  if (kg < 1000) {
    return `${kg} кг`;
  }
  return `${(kg / 1000).toFixed(2)} т`;
};

/**
 * Сокращение текста
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

/**
 * Первая буква заглавная
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Форматирование статуса для отображения
 */
export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': 'Активен',
    'inactive': 'Неактивен',
    'on_route': 'В пути',
    'on_break': 'На перерыве',
    'offline': 'Не в сети',
    'arrived': 'Прибыл',
    'departed': 'Убыл',
    'loading': 'Загрузка',
    'unloading': 'Выгрузка',
    'in_transit': 'В транзите',
    'completed': 'Завершен',
    'cancelled': 'Отменен',
    'created': 'Создан',
    'in_progress': 'В работе',
    'resolved': 'Решен',
    'closed': 'Закрыт',
    'rejected': 'Отклонен'
  };

  return statusMap[status] || capitalize(status);
};

