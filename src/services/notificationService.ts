/**
 * Сервис уведомлений
 * Last Updated: 29-10-2025
 */

import apiClient from './api';
import { ApiResponse, PaginatedResponse, Notification } from '@types/index';

/**
 * Получение списка уведомлений
 */
export const getNotifications = async (
  page: number = 1,
  pageSize: number = 20
): Promise<ApiResponse<PaginatedResponse<Notification>>> => {
  try {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>(
      '/notifications',
      { params: { page, pageSize } }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_NOTIFICATIONS_ERROR',
        message: error.response?.data?.message || 'Ошибка получения уведомлений',
      },
    };
  }
};

/**
 * Получение непрочитанных уведомлений
 */
export const getUnreadNotifications = async (): Promise<
  ApiResponse<Notification[]>
> => {
  try {
    const response = await apiClient.get<ApiResponse<Notification[]>>(
      '/notifications/unread'
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_UNREAD_ERROR',
        message: error.response?.data?.message || 'Ошибка получения непрочитанных уведомлений',
      },
    };
  }
};

/**
 * Отметка уведомления как прочитанного
 */
export const markAsRead = async (
  notificationId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'MARK_READ_ERROR',
        message: error.response?.data?.message || 'Ошибка отметки уведомления',
      },
    };
  }
};

/**
 * Отметка всех уведомлений как прочитанных
 */
export const markAllAsRead = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.patch('/notifications/read-all');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'MARK_ALL_READ_ERROR',
        message: error.response?.data?.message || 'Ошибка отметки всех уведомлений',
      },
    };
  }
};

/**
 * Удаление уведомления
 */
export const deleteNotification = async (
  notificationId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete(
      `/notifications/${notificationId}`
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'DELETE_NOTIFICATION_ERROR',
        message: error.response?.data?.message || 'Ошибка удаления уведомления',
      },
    };
  }
};

/**
 * Получение количества непрочитанных уведомлений
 */
export const getUnreadCount = async (): Promise<ApiResponse<{ count: number }>> => {
  try {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      '/notifications/unread/count'
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_COUNT_ERROR',
        message: error.response?.data?.message || 'Ошибка получения количества',
      },
    };
  }
};

