/**
 * Сервис инцидентов
 * Last Updated: 29-10-2025
 */

import apiClient from './api';
import {
  ApiResponse,
  PaginatedResponse,
  Incident,
  IncidentFormData,
  IncidentFilter,
} from '@types/index';

/**
 * Получение списка инцидентов
 */
export const getIncidents = async (
  filter?: IncidentFilter,
  page: number = 1,
  pageSize: number = 20
): Promise<ApiResponse<PaginatedResponse<Incident>>> => {
  try {
    const params = {
      page,
      pageSize,
      ...filter,
    };

    const response = await apiClient.get<ApiResponse<PaginatedResponse<Incident>>>(
      '/incidents',
      { params }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_INCIDENTS_ERROR',
        message: error.response?.data?.message || 'Ошибка получения инцидентов',
      },
    };
  }
};

/**
 * Получение инцидента по ID
 */
export const getIncidentById = async (
  incidentId: string
): Promise<ApiResponse<Incident>> => {
  try {
    const response = await apiClient.get<ApiResponse<Incident>>(
      `/incidents/${incidentId}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'GET_INCIDENT_ERROR',
        message: error.response?.data?.message || 'Ошибка получения инцидента',
      },
    };
  }
};

/**
 * Создание инцидента
 */
export const createIncident = async (
  data: IncidentFormData
): Promise<ApiResponse<Incident>> => {
  try {
    const formData = new FormData();
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('priority', data.priority);

    if (data.location) {
      formData.append('location', JSON.stringify(data.location));
    }

    // Добавление медиа файлов
    data.mediaFiles.forEach((file) => {
      formData.append('files', file);
    });

    const response = await apiClient.post<ApiResponse<Incident>>(
      '/incidents',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'CREATE_INCIDENT_ERROR',
        message: error.response?.data?.message || 'Ошибка создания инцидента',
      },
    };
  }
};

/**
 * Обновление инцидента
 */
export const updateIncident = async (
  incidentId: string,
  data: Partial<IncidentFormData>
): Promise<ApiResponse<Incident>> => {
  try {
    const response = await apiClient.put<ApiResponse<Incident>>(
      `/incidents/${incidentId}`,
      data
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'UPDATE_INCIDENT_ERROR',
        message: error.response?.data?.message || 'Ошибка обновления инцидента',
      },
    };
  }
};

/**
 * Удаление инцидента
 */
export const deleteIncident = async (
  incidentId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.delete(`/incidents/${incidentId}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'DELETE_INCIDENT_ERROR',
        message: error.response?.data?.message || 'Ошибка удаления инцидента',
      },
    };
  }
};

/**
 * Загрузка медиа файлов к инциденту
 */
export const uploadIncidentMedia = async (
  incidentId: string,
  files: File[]
): Promise<ApiResponse<Incident>> => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await apiClient.post<ApiResponse<Incident>>(
      `/incidents/${incidentId}/media`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'UPLOAD_MEDIA_ERROR',
        message: error.response?.data?.message || 'Ошибка загрузки файлов',
      },
    };
  }
};

/**
 * Добавление комментария к инциденту
 */
export const addIncidentComment = async (
  incidentId: string,
  text: string
): Promise<ApiResponse<Incident>> => {
  try {
    const response = await apiClient.post<ApiResponse<Incident>>(
      `/incidents/${incidentId}/comments`,
      { text }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: 'ADD_COMMENT_ERROR',
        message: error.response?.data?.message || 'Ошибка добавления комментария',
      },
    };
  }
};

