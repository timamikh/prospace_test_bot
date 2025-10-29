/**
 * Базовый API клиент с поддержкой офлайн режима
 * Last Updated: 29-10-2025
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_CONFIG } from '@/utils/constants';
import { StorageKeys } from '@types/index';
import { getFromStorage, saveToStorage } from '@/utils/storage';

/**
 * Очередь офлайн запросов
 */
interface OfflineRequest {
  id: string;
  url: string;
  method: string;
  data?: any;
  timestamp: number;
}

let offlineQueue: OfflineRequest[] = [];

/**
 * Создание экземпляра Axios
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - добавление токена авторизации
  instance.interceptors.request.use(
    (config) => {
      const token = getFromStorage<string>(StorageKeys.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - обработка ошибок
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Обработка 401 ошибки (неавторизован)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Здесь можно добавить логику обновления токена
        // Пока просто перенаправляем на авторизацию
        window.location.href = '/auth';
        return Promise.reject(error);
      }

      // Обработка сетевых ошибок (офлайн режим)
      if (!navigator.onLine) {
        console.log('Offline mode detected, queuing request');
        addToOfflineQueue(originalRequest);
        return Promise.reject(new Error('Нет подключения к интернету'));
      }

      // Повторные попытки для временных ошибок
      if (
        error.response?.status &&
        error.response.status >= 500 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Добавление запроса в офлайн очередь
 */
const addToOfflineQueue = (config: AxiosRequestConfig): void => {
  const request: OfflineRequest = {
    id: Date.now().toString(),
    url: config.url || '',
    method: config.method || 'GET',
    data: config.data,
    timestamp: Date.now(),
  };
  
  offlineQueue.push(request);
  saveToStorage(StorageKeys.OFFLINE_QUEUE, offlineQueue);
};

/**
 * Обработка офлайн очереди при восстановлении соединения
 */
export const processOfflineQueue = async (): Promise<void> => {
  const queue = getFromStorage<OfflineRequest[]>(StorageKeys.OFFLINE_QUEUE) || [];
  
  if (queue.length === 0) return;

  console.log(`Processing ${queue.length} offline requests`);

  for (const request of queue) {
    try {
      await apiClient.request({
        url: request.url,
        method: request.method as any,
        data: request.data,
      });
    } catch (error) {
      console.error('Error processing offline request:', error);
    }
  }

  // Очистка очереди после обработки
  offlineQueue = [];
  saveToStorage(StorageKeys.OFFLINE_QUEUE, []);
};

/**
 * Экспорт API клиента
 */
export const apiClient = createAxiosInstance();

/**
 * Слушатель онлайн/офлайн событий
 */
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Connection restored, processing offline queue');
    processOfflineQueue();
  });

  window.addEventListener('offline', () => {
    console.log('Connection lost, switching to offline mode');
  });
}

export default apiClient;

