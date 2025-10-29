/**
 * Store маршрутов
 * Last Updated: 29-10-2025
 */

import { create } from 'zustand';
import { Route, TripStatus, RouteFilter } from '@types/index';
import * as routeService from '@/services/routeService';

interface RouteState {
  routes: Route[];
  activeRoute: Route | null;
  selectedRoute: Route | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;

  // Actions
  fetchRoutes: (filter?: RouteFilter, page?: number) => Promise<void>;
  fetchActiveRoute: () => Promise<void>;
  fetchRouteById: (routeId: string) => Promise<void>;
  updateStatus: (routeId: string, status: TripStatus, notes?: string) => Promise<boolean>;
  markArrival: (routeId: string, checkpointId?: string) => Promise<boolean>;
  markDeparture: (routeId: string, checkpointId?: string) => Promise<boolean>;
  confirmSafety: (routeId: string) => Promise<boolean>;
  clearError: () => void;
  clearSelectedRoute: () => void;
}

export const useRouteStore = create<RouteState>((set, get) => ({
  routes: [],
  activeRoute: null,
  selectedRoute: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,

  fetchRoutes: async (filter?: RouteFilter, page: number = 1) => {
    set({ isLoading: true, error: null });

    try {
      const response = await routeService.getRoutes(filter, page);

      if (response.success && response.data) {
        const newRoutes = page === 1 
          ? response.data.items 
          : [...get().routes, ...response.data.items];

        set({
          routes: newRoutes,
          currentPage: page,
          hasMore: response.data.hasMore,
          isLoading: false,
        });
      } else {
        set({
          error: response.error?.message || 'Ошибка загрузки маршрутов',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка загрузки маршрутов',
        isLoading: false,
      });
    }
  },

  fetchActiveRoute: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await routeService.getActiveRoute();

      if (response.success && response.data) {
        set({
          activeRoute: response.data,
          isLoading: false,
        });
      } else {
        set({
          activeRoute: null,
          error: response.error?.message,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка загрузки активного маршрута',
        isLoading: false,
      });
    }
  },

  fetchRouteById: async (routeId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await routeService.getRouteById(routeId);

      if (response.success && response.data) {
        set({
          selectedRoute: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error?.message || 'Ошибка загрузки маршрута',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка загрузки маршрута',
        isLoading: false,
      });
    }
  },

  updateStatus: async (routeId: string, status: TripStatus, notes?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await routeService.updateRouteStatus(routeId, status, notes);

      if (response.success && response.data) {
        // Обновляем маршрут в списке
        const updatedRoutes = get().routes.map(route =>
          route.id === routeId ? response.data! : route
        );

        // Обновляем активный маршрут если это он
        const updatedActiveRoute = get().activeRoute?.id === routeId
          ? response.data
          : get().activeRoute;

        set({
          routes: updatedRoutes,
          activeRoute: updatedActiveRoute,
          selectedRoute: response.data,
          isLoading: false,
        });

        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка обновления статуса',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка обновления статуса',
        isLoading: false,
      });
      return false;
    }
  },

  markArrival: async (routeId: string, checkpointId?: string) => {
    return get().updateStatus(routeId, TripStatus.ARRIVED);
  },

  markDeparture: async (routeId: string, checkpointId?: string) => {
    return get().updateStatus(routeId, TripStatus.DEPARTED);
  },

  confirmSafety: async (routeId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await routeService.confirmSafetyInstructions(routeId);

      if (response.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error?.message || 'Ошибка подтверждения',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Ошибка подтверждения',
        isLoading: false,
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),
  clearSelectedRoute: () => set({ selectedRoute: null }),
}));

