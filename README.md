# TMS Driver Mini App

Telegram Mini App для водителей транспортной системы управления (TMS).

## 📋 Описание

Приложение предоставляет водителям удобный интерфейс для:
- Управления статусом прибытия/убытия
- Получения уведомлений о вызовах на погрузку/выгрузку
- Просмотра маршрутов и инструкций
- Создания и отслеживания инцидентов
- Интеграции с ЭТрН системой

## 🚀 Технологический стек

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Framework**: Telegram UI Kit
- **HTTP Client**: Axios
- **Router**: React Router v6
- **File Upload**: React Dropzone
- **PWA**: Vite PWA Plugin

## 📦 Установка

```bash
# Установка зависимостей
npm install

# Копирование env файла
cp .env.example .env

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр production сборки
npm run preview
```

## 🔧 Конфигурация

1. Отредактируйте `.env` файл с вашими настройками:
   - `VITE_TELEGRAM_BOT_TOKEN` - токен вашего Telegram бота
   - `VITE_API_BASE_URL` - URL вашего backend API

2. Настройте webhook для Telegram бота или используйте локальный тестовый сервер

## 🏗️ Структура проекта

```
src/
├── components/        # Компоненты
│   ├── ui/           # Переиспользуемые UI компоненты
│   └── features/     # Функциональные компоненты
├── pages/            # Страницы приложения
├── services/         # API сервисы
├── stores/           # Zustand stores
├── types/            # TypeScript типы
├── utils/            # Вспомогательные функции
└── App.tsx           # Главный компонент
```

## 🔑 Данные для доступа

- **Bot Username**: @Prospase_test_bot
- **Bot Token**: 8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE
- **GitHub**: https://github.com/timamikh

## 📱 Функциональность

### Реализованные User Stories:
- [MA-01] Быстрая авторизация через Telegram
- [MA-02] Управление статусом водителя
- [MA-03] Push-уведомления о вызовах
- [MA-04] Просмотр маршрутов
- [MA-05] Создание инцидентов с медиа
- [MA-06] История инцидентов с фильтрацией

## 🧪 Тестирование

```bash
# Запуск типов проверки
npm run type-check

# Запуск линтера
npm run lint
```

## 📄 Лицензия

Proprietary - All rights reserved

## 👨‍💻 Разработка

Разработано с использованием Cursor AI для быстрой и эффективной разработки.

---

**Last Updated**: 29-10-2025

