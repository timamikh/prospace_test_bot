/**
 * Store инцидентов
 * Last Updated: 29-10-2025
 */

import { create } from 'zustand';
import { Incident, IncidentFormData, IncidentFilter } from '@types/index';
import * as incidentService from '@/services/incidentService';

interface IncidentState {
  incidents: Incident[];
  selectedIncident: Incident | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  filter: IncidentFilter | null;

  // Actions
  fetchIncidents: (filter?: IncidentFilter, page?: number) => Promise<void>;
  fetchIncidentById: (incidentId: string) => Promise<void>;
  createIncident: (data: IncidentFormData) => Promise<boolean>;
  updateIncident: (incidentId: string, data: Partial<IncidentFormData>) => Promise<boolean>;
  deleteIncident: (incidentId: string) => Promise<boolean>;
  uploadMedia: (incidentId: string, files: File[]) => Promise<boolean>;
  addComment: (incidentId: string, text: string) => Promise<boolean>;
  setFilter: (filter: IncidentFilter) => void;
  clearFilter: () => void;
  clearError: () => void;
  clearSelectedIncident: () => void;
}

export const useIncidentStore = create<IncidentState>((set, get) => ({
  incidents: [],
  selectedIncident: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  filter: null,

  fetchIncidents: async (filter?: IncidentFilter, page: number = 1) => {
    set({ isLoading: true, error: null });

    const currentFilter = filter || get().filter || undefined;

    try {
      const response = await incidentService.getIncidents(currentFilter, page);

      if (response.success && response.data) {
        const newIncidents = page === 1
          ? response.data.items
          : [...get().incidents, ...response.data.items];

        set({
          incidents: newIncidents,
          currentPage: page,
          hasMore: response.data.hasMore,
          isLoading: false,
        });
      } else {
        set({
          error: response.error?.message || 'Ошибка загрузки инцидентов',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка загрузки инцидентов',
        isLoading: false,
      });
    }
  },

  fetchIncidentById: async (incidentId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incidentService.getIncidentById(incidentId);

      if (response.success && response.data) {
        set({
          selectedIncident: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error?.message || 'Ошибка загрузки инцидента',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка загрузки инцидента',
        isLoading: false,
      });
    }
  },

  createIncident: async (data: IncidentFormData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incidentService.createIncident(data);

      if (response.success && response.data) {
        set({
          incidents: [response.data, ...get().incidents],
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка создания инцидента',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка создания инцидента',
        isLoading: false,
      });
      return false;
    }
  },

  updateIncident: async (incidentId: string, data: Partial<IncidentFormData>) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incidentService.updateIncident(incidentId, data);

      if (response.success && response.data) {
        const updatedIncidents = get().incidents.map(incident =>
          incident.id === incidentId ? response.data! : incident
        );

        set({
          incidents: updatedIncidents,
          selectedIncident: response.data,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка обновления инцидента',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка обновления инцидента',
        isLoading: false,
      });
      return false;
    }
  },

  deleteIncident: async (incidentId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incidentService.deleteIncident(incidentId);

      if (response.success) {
        const filteredIncidents = get().incidents.filter(
          incident => incident.id !== incidentId
        );

        set({
          incidents: filteredIncidents,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка удаления инцидента',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка удаления инцидента',
        isLoading: false,
      });
      return false;
    }
  },

  uploadMedia: async (incidentId: string, files: File[]) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incidentService.uploadIncidentMedia(incidentId, files);

      if (response.success && response.data) {
        set({
          selectedIncident: response.data,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка загрузки файлов',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка загрузки файлов',
        isLoading: false,
      });
      return false;
    }
  },

  addComment: async (incidentId: string, text: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incidentService.addIncidentComment(incidentId, text);

      if (response.success && response.data) {
        set({
          selectedIncident: response.data,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка добавления комментария',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка добавления комментария',
        isLoading: false,
      });
      return false;
    }
  },

  setFilter: (filter: IncidentFilter) => {
    set({ filter, currentPage: 1 });
    get().fetchIncidents(filter, 1);
  },

  clearFilter: () => {
    set({ filter: null, currentPage: 1 });
    get().fetchIncidents(undefined, 1);
  },

  clearError: () => set({ error: null }),
  clearSelectedIncident: () => set({ selectedIncident: null }),
}));

