# 🚀 Быстрый старт TMS Driver Mini App

## 📋 Предварительные требования

- Node.js 18+ 
- npm или yarn
- Git
- GitHub аккаунт (@timamikh)

## ⚡ Быстрая установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Создание .env файла

```bash
# Создайте .env файл в корне проекта
echo "VITE_TELEGRAM_BOT_TOKEN=8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE
VITE_TELEGRAM_BOT_USERNAME=Prospase_test_bot
VITE_API_BASE_URL=https://api.yourdomain.com" > .env
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 🔧 Доступные команды

```bash
# Разработка
npm run dev          # Запуск dev сервера

# Production
npm run build        # Сборка для production
npm run preview      # Предпросмотр production сборки

# Проверка качества кода
npm run lint         # Запуск ESLint
npm run type-check   # Проверка TypeScript типов
```

## 📱 Тестирование в Telegram

### Вариант 1: Использование ngrok (рекомендуется для разработки)

```bash
# 1. Запустите приложение
npm run dev

# 2. В новом терминале запустите ngrok
npx ngrok http 3000

# 3. Скопируйте HTTPS URL (например: https://abc123.ngrok.io)

# 4. Настройте бота через @BotFather
# - /mybots → @Prospase_test_bot
# - Bot Settings → Menu Button
# - Configure menu button
# - Введите ngrok URL
```

### Вариант 2: Деплой на GitHub Pages

См. подробную инструкцию в [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔐 Данные для доступа

- **Bot**: @Prospase_test_bot
- **Token**: `8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE`
- **GitHub**: https://github.com/timamikh

## 📂 Структура проекта

```
tms-driver-mini-app/
├── src/
│   ├── components/      # React компоненты
│   │   ├── ui/         # Базовые UI компоненты
│   │   └── features/   # Функциональные компоненты
│   ├── pages/          # Страницы приложения
│   ├── services/       # API сервисы
│   ├── stores/         # Zustand stores
│   ├── types/          # TypeScript типы
│   ├── utils/          # Утилиты
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Глобальные стили
│   ├── App.tsx         # Главный компонент
│   └── main.tsx        # Точка входа
├── public/             # Статические файлы
├── .github/            # GitHub Actions workflows
└── ...конфигурационные файлы
```

## 🎯 Основные фичи

✅ Авторизация через SMS
✅ Управление статусом водителя
✅ Просмотр маршрутов
✅ Создание инцидентов с медиа
✅ Push-уведомления
✅ Офлайн режим
✅ PWA поддержка
✅ Telegram Web App интеграция

## 🐛 Отладка

### Проверка Telegram Web App

```javascript
// Откройте DevTools Console в браузере
console.log(window.Telegram?.WebApp);
```

### Просмотр логов

```javascript
// Все логи доступны в console
window.Telegram?.WebApp.version
window.Telegram?.WebApp.platform
```

## 📚 Дополнительная документация

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Полное руководство по деплою
- [CHECKLIST.md](./CHECKLIST.md) - Checklist перед релизом
- [README.md](./README.md) - Общая информация о проекте

## 💡 Полезные ссылки

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## ⚠️ Важно

1. **НЕ** коммитьте `.env` файл (уже в .gitignore)
2. Используйте GitHub Secrets для конфиденциальных данных
3. Тестируйте на разных устройствах перед деплоем

## 🆘 Помощь

Если возникли проблемы:
1. Проверьте все зависимости установлены: `npm install`
2. Проверьте `.env` файл создан и заполнен
3. Проверьте console на ошибки
4. См. раздел Troubleshooting в [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Last Updated**: 29-10-2025
**Version**: 1.0.0

