/**
 * Глобальный store приложения
 * Last Updated: 29-10-2025
 */

import { create } from 'zustand';
import { Notification } from '@types/index';
import * as notificationService from '@/services/notificationService';

interface AppState {
  // UI State
  isOnline: boolean;
  isAppReady: boolean;
  theme: 'light' | 'dark';
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;

  // Loading & Errors
  globalLoading: boolean;
  globalError: string | null;

  // Actions
  setOnlineStatus: (status: boolean) => void;
  setAppReady: (ready: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  setGlobalLoading: (loading: boolean) => void;
  setGlobalError: (error: string | null) => void;
  clearGlobalError: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isOnline: navigator.onLine,
  isAppReady: false,
  theme: 'light',
  notifications: [],
  unreadCount: 0,
  globalLoading: false,
  globalError: null,

  setOnlineStatus: (status: boolean) => set({ isOnline: status }),

  setAppReady: (ready: boolean) => set({ isAppReady: ready }),

  setTheme: (theme: 'light' | 'dark') => set({ theme }),

  fetchNotifications: async () => {
    try {
      const response = await notificationService.getNotifications();

      if (response.success && response.data) {
        set({ notifications: response.data.items });
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },

  fetchUnreadCount: async () => {
    try {
      const response = await notificationService.getUnreadCount();

      if (response.success && response.data) {
        set({ unreadCount: response.data.count });
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  },

  markNotificationAsRead: async (notificationId: string) => {
    try {
      const response = await notificationService.markAsRead(notificationId);

      if (response.success) {
        const updatedNotifications = get().notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        );

        set({
          notifications: updatedNotifications,
          unreadCount: Math.max(0, get().unreadCount - 1),
        });
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      const response = await notificationService.markAllAsRead();

      if (response.success) {
        const updatedNotifications = get().notifications.map(notif => ({
          ...notif,
          read: true,
        }));

        set({
          notifications: updatedNotifications,
          unreadCount: 0,
        });
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  },

  setGlobalLoading: (loading: boolean) => set({ globalLoading: loading }),

  setGlobalError: (error: string | null) => set({ globalError: error }),

  clearGlobalError: () => set({ globalError: null }),
}));

// Слушатели онлайн/офлайн событий
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useAppStore.getState().setOnlineStatus(true);
  });

  window.addEventListener('offline', () => {
    useAppStore.getState().setOnlineStatus(false);
  });
}

