/**
 * Сервис авторизации
 * Last Updated: 29-10-2025
 */

import apiClient from './api';
import { ApiResponse, User } from '@types/index';
import { StorageKeys } from '@types/index';
import { saveToStorage, removeFromStorage } from '@/utils/storage';

export interface LoginRequest {
  phone: string;
}

export interface LoginResponse {
  sessionId: string;
  expiresIn: number;
}

export interface VerifyCodeRequest {
  phone: string;
  code: string;
  sessionId: string;
}

export interface VerifyCodeResponse {
  token: string;
  user: User;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Отправка SMS кода
 */
export const sendSMSCode = async (
  phone: string
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/send-code',
      { phone }
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'SEND_SMS_ERROR',
        message: error.response?.data?.message || 'Ошибка отправки SMS кода',
      },
    };
  }
};

/**
 * Верификация SMS кода
 */
export const verifySMSCode = async (
  data: VerifyCodeRequest
): Promise<ApiResponse<VerifyCodeResponse>> => {
  try {
    const response = await apiClient.post<ApiResponse<VerifyCodeResponse>>(
      '/auth/verify-code',
      data
    );

    // Сохраняем токен и данные пользователя
    if (response.data.success && response.data.data) {
      saveToStorage(StorageKeys.AUTH_TOKEN, response.data.data.token);
      saveToStorage(StorageKeys.USER_DATA, response.data.data.user);
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'VERIFY_CODE_ERROR',
        message: error.response?.data?.message || 'Неверный код подтверждения',
      },
    };
  }
};

/**
 * Обновление токена
 */
export const refreshToken = async (
  refreshToken: string
): Promise<ApiResponse<{ token: string; refreshToken: string }>> => {
  try {
    const response = await apiClient.post('/auth/refresh-token', {
      refreshToken,
    });

    if (response.data.success && response.data.data) {
      saveToStorage(StorageKeys.AUTH_TOKEN, response.data.data.token);
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'REFRESH_TOKEN_ERROR',
        message: error.response?.data?.message || 'Ошибка обновления токена',
      },
    };
  }
};

/**
 * Выход из системы
 */
export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    await apiClient.post('/auth/logout');
    
    // Очистка локального хранилища
    removeFromStorage(StorageKeys.AUTH_TOKEN);
    removeFromStorage(StorageKeys.USER_DATA);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'LOGOUT_ERROR',
        message: error.response?.data?.message || 'Ошибка выхода из системы',
      },
    };
  }
};

/**
 * Получение профиля пользователя
 */
export const getUserProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    
    if (response.data.success && response.data.data) {
      saveToStorage(StorageKeys.USER_DATA, response.data.data);
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_PROFILE_ERROR',
        message: error.response?.data?.message || 'Ошибка получения профиля',
      },
    };
  }
};

/**
 * Обновление профиля пользователя
 */
export const updateUserProfile = async (
  data: Partial<User>
): Promise<ApiResponse<User>> => {
  try {
    const response = await apiClient.put<ApiResponse<User>>(
      '/auth/profile',
      data
    );

    if (response.data.success && response.data.data) {
      saveToStorage(StorageKeys.USER_DATA, response.data.data);
    }

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'UPDATE_PROFILE_ERROR',
        message: error.response?.data?.message || 'Ошибка обновления профиля',
      },
    };
  }
};

/**
 * Проверка авторизации
 */
export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/auth/check');
    return response.data.success;
  } catch {
    return false;
  }
};

