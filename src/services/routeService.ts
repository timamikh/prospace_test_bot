/**
 * Сервис маршрутов
 * Last Updated: 29-10-2025
 */

import apiClient from './api';
import { ApiResponse, PaginatedResponse, Route, TripStatus, RouteFilter } from '@types/index';

/**
 * Получение списка маршрутов
 */
export const getRoutes = async (
  filter?: RouteFilter,
  page: number = 1,
  pageSize: number = 20
): Promise<ApiResponse<PaginatedResponse<Route>>> => {
  try {
    const params = {
      page,
      pageSize,
      ...filter,
    };

    const response = await apiClient.get<ApiResponse<PaginatedResponse<Route>>>(
      '/routes',
      { params }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_ROUTES_ERROR',
        message: error.response?.data?.message || 'Ошибка получения маршрутов',
      },
    };
  }
};

/**
 * Получение активного маршрута
 */
export const getActiveRoute = async (): Promise<ApiResponse<Route>> => {
  try {
    const response = await apiClient.get<ApiResponse<Route>>('/routes/active');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_ACTIVE_ROUTE_ERROR',
        message: error.response?.data?.message || 'Ошибка получения активного маршрута',
      },
    };
  }
};

/**
 * Получение маршрута по ID
 */
export const getRouteById = async (routeId: string): Promise<ApiResponse<Route>> => {
  try {
    const response = await apiClient.get<ApiResponse<Route>>(`/routes/${routeId}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_ROUTE_ERROR',
        message: error.response?.data?.message || 'Ошибка получения маршрута',
      },
    };
  }
};

/**
 * Обновление статуса маршрута
 */
export const updateRouteStatus = async (
  routeId: string,
  status: TripStatus,
  notes?: string
): Promise<ApiResponse<Route>> => {
  try {
    const response = await apiClient.patch<ApiResponse<Route>>(
      `/routes/${routeId}/status`,
      { status, notes }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'UPDATE_STATUS_ERROR',
        message: error.response?.data?.message || 'Ошибка обновления статуса',
      },
    };
  }
};

/**
 * Отметка прибытия
 */
export const markArrival = async (
  routeId: string,
  checkpointId?: string
): Promise<ApiResponse<Route>> => {
  try {
    const response = await apiClient.post<ApiResponse<Route>>(
      `/routes/${routeId}/arrival`,
      { checkpointId, timestamp: new Date().toISOString() }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'MARK_ARRIVAL_ERROR',
        message: error.response?.data?.message || 'Ошибка отметки прибытия',
      },
    };
  }
};

/**
 * Отметка убытия
 */
export const markDeparture = async (
  routeId: string,
  checkpointId?: string
): Promise<ApiResponse<Route>> => {
  try {
    const response = await apiClient.post<ApiResponse<Route>>(
      `/routes/${routeId}/departure`,
      { checkpointId, timestamp: new Date().toISOString() }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'MARK_DEPARTURE_ERROR',
        message: error.response?.data?.message || 'Ошибка отметки убытия',
      },
    };
  }
};

/**
 * Получение истории маршрутов
 */
export const getRouteHistory = async (
  page: number = 1,
  pageSize: number = 20
): Promise<ApiResponse<PaginatedResponse<Route>>> => {
  try {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Route>>>(
      '/routes/history',
      { params: { page, pageSize } }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_HISTORY_ERROR',
        message: error.response?.data?.message || 'Ошибка получения истории',
      },
    };
  }
};

/**
 * Подтверждение просмотра инструктажа
 */
export const confirmSafetyInstructions = async (
  routeId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post(
      `/routes/${routeId}/confirm-safety`
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'CONFIRM_SAFETY_ERROR',
        message: error.response?.data?.message || 'Ошибка подтверждения инструктажа',
      },
    };
  }
};

