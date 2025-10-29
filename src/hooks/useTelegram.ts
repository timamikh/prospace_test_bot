/**
 * React Hook для работы с Telegram Web App
 * Last Updated: 29-10-2025
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  initTelegramWebApp,
  applyTelegramTheme,
  getTelegramUser,
  backButton,
  hapticFeedback,
  getTelegramWebApp,
} from '@/utils/telegram';

/**
 * Hook для инициализации Telegram Web App
 */
export const useTelegramInit = () => {
  useEffect(() => {
    initTelegramWebApp();
    applyTelegramTheme();
  }, []);
};

/**
 * Hook для получения данных пользователя Telegram
 */
export const useTelegramUser = () => {
  return getTelegramUser();
};

/**
 * Hook для управления BackButton
 */
export const useTelegramBackButton = (show: boolean = false) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      backButton.show(() => {
        hapticFeedback.impact('light');
        navigate(-1);
      });
    } else {
      backButton.hide();
    }

    return () => {
      backButton.hide();
    };
  }, [show, navigate]);
};

/**
 * Hook для haptic feedback
 */
export const useHapticFeedback = () => {
  return hapticFeedback;
};

/**
 * Hook для получения theme params
 */
export const useTelegramTheme = () => {
  const webApp = getTelegramWebApp();
  return {
    colorScheme: webApp?.colorScheme || 'light',
    themeParams: webApp?.themeParams || {},
  };
};

/**
 * Hook для определения платформы
 */
export const useTelegramPlatform = () => {
  const webApp = getTelegramWebApp();
  return webApp?.platform || 'unknown';
};

