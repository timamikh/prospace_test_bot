/**
 * Константы приложения
 * Last Updated: 29-10-2025
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

export const TELEGRAM_CONFIG = {
  BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',
  BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || ''
};

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/quicktime'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

export const CACHE_CONFIG = {
  EXPIRATION_TIME: 1000 * 60 * 60, // 1 hour
  MAX_ITEMS: 100
};

export const ROUTES = {
  AUTH: '/auth',
  DASHBOARD: '/',
  ROUTES: '/routes',
  ROUTE_DETAILS: '/routes/:id',
  INCIDENTS: '/incidents',
  CREATE_INCIDENT: '/incidents/create',
  INCIDENT_DETAILS: '/incidents/:id',
  PROFILE: '/profile',
  INSTRUCTIONS: '/instructions'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'tms_auth_token',
  USER_DATA: 'tms_user_data',
  ROUTES_CACHE: 'tms_routes_cache',
  INCIDENTS_CACHE: 'tms_incidents_cache'
};

export const SMS_CODE_LENGTH = 6;
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

