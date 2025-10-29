/**
 * Store авторизации и пользователя
 * Last Updated: 29-10-2025
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, StorageKeys } from '@types/index';
import * as authService from '@/services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;

  // Actions
  sendSMSCode: (phone: string) => Promise<boolean>;
  verifySMSCode: (phone: string, code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getUserProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  setSessionId: (sessionId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      sessionId: null,

      sendSMSCode: async (phone: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.sendSMSCode(phone);

          if (response.success && response.data) {
            set({ 
              sessionId: response.data.sessionId,
              isLoading: false 
            });
            return true;
          } else {
            set({ 
              error: response.error?.message || 'Ошибка отправки кода',
              isLoading: false 
            });
            return false;
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Ошибка отправки кода',
            isLoading: false 
          });
          return false;
        }
      },

      verifySMSCode: async (phone: string, code: string) => {
        set({ isLoading: true, error: null });

        const { sessionId } = get();
        if (!sessionId) {
          set({ 
            error: 'Сессия не найдена. Запросите код повторно',
            isLoading: false 
          });
          return false;
        }

        try {
          const response = await authService.verifySMSCode({
            phone,
            code,
            sessionId,
          });

          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
              sessionId: null,
            });
            return true;
          } else {
            set({
              error: response.error?.message || 'Неверный код',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Ошибка верификации',
            isLoading: false,
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            sessionId: null,
          });
        }
      },

      getUserProfile: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.getUserProfile();

          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
            });
          } else {
            set({
              error: response.error?.message || 'Ошибка загрузки профиля',
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.message || 'Ошибка загрузки профиля',
            isLoading: false,
          });
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.updateUserProfile(data);

          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
            });
            return true;
          } else {
            set({
              error: response.error?.message || 'Ошибка обновления профиля',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Ошибка обновления профиля',
            isLoading: false,
          });
          return false;
        }
      },

      clearError: () => set({ error: null }),

      setSessionId: (sessionId: string) => set({ sessionId }),
    }),
    {
      name: StorageKeys.USER_DATA,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

