/**
 * Утилиты для работы с Telegram Mini App SDK
 * Last Updated: 29-10-2025
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
          };
          auth_date: number;
          hash: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        
        ready: () => void;
        expand: () => void;
        close: () => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
        
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        
        CloudStorage: {
          setItem: (key: string, value: string, callback?: (error: Error | null, success: boolean) => void) => void;
          getItem: (key: string, callback: (error: Error | null, value: string | null) => void) => void;
          getItems: (keys: string[], callback: (error: Error | null, values: Record<string, string>) => void) => void;
          removeItem: (key: string, callback?: (error: Error | null, success: boolean) => void) => void;
          removeItems: (keys: string[], callback?: (error: Error | null, success: boolean) => void) => void;
          getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
        };
        
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{ id?: string; type?: string; text: string }>;
        }, callback?: (buttonId: string) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        sendData: (data: string) => void;
        
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
      };
    };
  }
}

/**
 * Проверка доступности Telegram Web App
 */
export const isTelegramWebApp = (): boolean => {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
};

/**
 * Получение Telegram Web App instance
 */
export const getTelegramWebApp = () => {
  if (!isTelegramWebApp()) {
    console.warn('Telegram Web App is not available');
    return null;
  }
  return window.Telegram!.WebApp;
};

/**
 * Инициализация Telegram Web App
 */
export const initTelegramWebApp = () => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.ready();
    webApp.expand();
    console.log('Telegram Web App initialized', {
      version: webApp.version,
      platform: webApp.platform,
      colorScheme: webApp.colorScheme,
    });
  }
};

/**
 * Получение данных пользователя Telegram
 */
export const getTelegramUser = () => {
  const webApp = getTelegramWebApp();
  return webApp?.initDataUnsafe.user || null;
};

/**
 * Применение темы Telegram к приложению
 */
export const applyTelegramTheme = () => {
  const webApp = getTelegramWebApp();
  if (!webApp) return;

  const { themeParams } = webApp;
  const root = document.documentElement;

  if (themeParams.bg_color) {
    root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
  }
  if (themeParams.text_color) {
    root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
  }
  if (themeParams.hint_color) {
    root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
  }
  if (themeParams.link_color) {
    root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
  }
  if (themeParams.button_color) {
    root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
  }
  if (themeParams.button_text_color) {
    root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
  }
  if (themeParams.secondary_bg_color) {
    root.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color);
  }
};

/**
 * Haptic feedback
 */
export const hapticFeedback = {
  impact: (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    const webApp = getTelegramWebApp();
    webApp?.HapticFeedback.impactOccurred(style);
  },
  
  notification: (type: 'error' | 'success' | 'warning') => {
    const webApp = getTelegramWebApp();
    webApp?.HapticFeedback.notificationOccurred(type);
  },
  
  selection: () => {
    const webApp = getTelegramWebApp();
    webApp?.HapticFeedback.selectionChanged();
  },
};

/**
 * Main Button управление
 */
export const mainButton = {
  show: (text: string, onClick: () => void) => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    webApp.MainButton.setText(text);
    webApp.MainButton.onClick(onClick);
    webApp.MainButton.show();
  },
  
  hide: () => {
    const webApp = getTelegramWebApp();
    webApp?.MainButton.hide();
  },
  
  showProgress: () => {
    const webApp = getTelegramWebApp();
    webApp?.MainButton.showProgress();
  },
  
  hideProgress: () => {
    const webApp = getTelegramWebApp();
    webApp?.MainButton.hideProgress();
  },
  
  setParams: (params: { text?: string; color?: string; is_active?: boolean }) => {
    const webApp = getTelegramWebApp();
    webApp?.MainButton.setParams(params);
  },
};

/**
 * Back Button управление
 */
export const backButton = {
  show: (onClick: () => void) => {
    const webApp = getTelegramWebApp();
    if (!webApp) return;

    webApp.BackButton.onClick(onClick);
    webApp.BackButton.show();
  },
  
  hide: () => {
    const webApp = getTelegramWebApp();
    webApp?.BackButton.hide();
  },
};

/**
 * Cloud Storage operations
 */
export const cloudStorage = {
  setItem: (key: string, value: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const webApp = getTelegramWebApp();
      if (!webApp) {
        resolve(false);
        return;
      }

      webApp.CloudStorage.setItem(key, value, (error, success) => {
        if (error) {
          console.error('CloudStorage setItem error:', error);
          resolve(false);
        } else {
          resolve(success);
        }
      });
    });
  },
  
  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const webApp = getTelegramWebApp();
      if (!webApp) {
        resolve(null);
        return;
      }

      webApp.CloudStorage.getItem(key, (error, value) => {
        if (error) {
          console.error('CloudStorage getItem error:', error);
          resolve(null);
        } else {
          resolve(value);
        }
      });
    });
  },
  
  removeItem: (key: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const webApp = getTelegramWebApp();
      if (!webApp) {
        resolve(false);
        return;
      }

      webApp.CloudStorage.removeItem(key, (error, success) => {
        if (error) {
          console.error('CloudStorage removeItem error:', error);
          resolve(false);
        } else {
          resolve(success);
        }
      });
    });
  },
};

/**
 * Открытие ссылок
 */
export const openLink = (url: string) => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.openLink(url);
  } else {
    window.open(url, '_blank');
  }
};

/**
 * Показ alert
 */
export const showAlert = (message: string): Promise<void> => {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.showAlert(message, () => resolve());
    } else {
      alert(message);
      resolve();
    }
  });
};

/**
 * Показ confirm
 */
export const showConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.showConfirm(message, (confirmed) => resolve(confirmed));
    } else {
      resolve(confirm(message));
    }
  });
};

/**
 * Закрытие приложения
 */
export const closeApp = () => {
  const webApp = getTelegramWebApp();
  webApp?.close();
};

