# Руководство по деплою TMS Driver Mini App

## Предварительные требования

1. Node.js 18+ установлен
2. npm или yarn
3. GitHub аккаунт
4. Telegram Bot Token (уже есть: `8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE`)

## Локальная разработка

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
VITE_TELEGRAM_BOT_TOKEN=8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE
VITE_TELEGRAM_BOT_USERNAME=Prospase_test_bot
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### 4. Тестирование в Telegram

Для тестирования Mini App в Telegram:

1. Откройте @BotFather в Telegram
2. Используйте команду `/mybots`
3. Выберите вашего бота @Prospase_test_bot
4. Выберите "Bot Settings" → "Menu Button"
5. Выберите "Configure menu button"
6. Введите URL: `https://your-dev-url.com` (или используйте ngrok для локальной разработки)

#### Использование ngrok для локального тестирования:

```bash
# Установите ngrok
npm install -g ngrok

# Запустите ngrok
ngrok http 3000
```

Используйте HTTPS URL от ngrok в настройках бота.

## Деплой на GitHub Pages

### 1. Подготовка репозитория

```bash
git init
git add .
git commit -m "Initial commit: TMS Driver Mini App"
```

### 2. Создание репозитория на GitHub

1. Перейдите на [https://github.com/new](https://github.com/new)
2. Создайте новый репозиторий с именем `tms-driver-mini-app`
3. НЕ инициализируйте с README, .gitignore или лицензией

### 3. Привязка и push на GitHub

```bash
git remote add origin https://github.com/timamikh/tms-driver-mini-app.git
git branch -M main
git push -u origin main
```

### 4. Настройка GitHub Secrets

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте следующие secrets:
   - `VITE_TELEGRAM_BOT_TOKEN`: `8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE`
   - `VITE_TELEGRAM_BOT_USERNAME`: `Prospase_test_bot`
   - `VITE_API_BASE_URL`: URL вашего backend API

### 5. Включение GitHub Pages

1. Перейдите в Settings → Pages
2. Source: выберите "Deploy from a branch"
3. Branch: выберите `gh-pages` и `/root`
4. Save

### 6. Настройка base path в vite.config.ts

Обновите `vite.config.ts` для GitHub Pages:

```typescript
export default defineConfig({
  base: '/tms-driver-mini-app/',
  // ... остальная конфигурация
});
```

Commit и push изменения:

```bash
git add vite.config.ts
git commit -m "Configure base path for GitHub Pages"
git push
```

### 7. Деплой

При каждом push в main ветку автоматически запустится GitHub Actions workflow, который:
1. Установит зависимости
2. Выполнит type checking
3. Выполнит linting
4. Соберет production build
5. Задеплоит на GitHub Pages

URL вашего приложения: `https://timamikh.github.io/tms-driver-mini-app/`

## Настройка Telegram Bot

### 1. Установка Mini App URL

```bash
# Используйте Telegram Bot API или @BotFather
curl -X POST "https://api.telegram.org/bot8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE/setWebAppInfo" \
-H "Content-Type: application/json" \
-d '{"url": "https://timamikh.github.io/tms-driver-mini-app/"}'
```

Или через @BotFather:
1. `/mybots`
2. Выберите @Prospase_test_bot
3. Bot Settings → Menu Button → Configure menu button
4. Введите URL: `https://timamikh.github.io/tms-driver-mini-app/`

### 2. Настройка команд бота

```bash
curl -X POST "https://api.telegram.org/bot8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE/setMyCommands" \
-H "Content-Type: application/json" \
-d '{
  "commands": [
    {"command": "start", "description": "Запустить приложение"},
    {"command": "help", "description": "Помощь"}
  ]
}'
```

## Деплой на кастомный домен (опционально)

### 1. Настройка DNS

Добавьте CNAME запись, указывающую на `timamikh.github.io`

### 2. Обновите GitHub Pages настройки

1. Settings → Pages → Custom domain
2. Введите ваш домен
3. Включите "Enforce HTTPS"

### 3. Обновите CNAME в workflow

В `.github/workflows/deploy.yml` раскомментируйте и обновите:

```yaml
cname: your-custom-domain.com
```

## Мониторинг и отладка

### Проверка deployment статуса

1. Перейдите в Actions tab на GitHub
2. Проверьте статус последнего workflow run

### Логи

- GitHub Actions логи: Actions tab → выберите workflow run
- Browser console: откройте DevTools в браузере
- Telegram Web App логи: доступны через `window.Telegram.WebApp.version`

## Обновление приложения

```bash
# Внесите изменения в код
git add .
git commit -m "Your commit message"
git push

# GitHub Actions автоматически задеплоит обновления
```

## Rollback

Для отката к предыдущей версии:

```bash
git revert HEAD
git push
```

Или используйте GitHub UI для revert commit.

## Безопасность

1. **НЕ** коммитьте `.env` файл (он в .gitignore)
2. Используйте GitHub Secrets для конфиденциальных данных
3. Регулярно обновляйте зависимости: `npm audit fix`
4. Проверяйте права доступа к боту

## Troubleshooting

### Приложение не загружается в Telegram

1. Проверьте HTTPS настройки
2. Проверьте URL в настройках бота
3. Проверьте Browser console на ошибки
4. Убедитесь, что Telegram Web App SDK подключен

### Build fails

1. Проверьте GitHub Actions логи
2. Убедитесь, что все secrets настроены
3. Проверьте синтаксис в коде: `npm run lint`
4. Проверьте типы: `npm run type-check`

### 404 ошибка после деплоя

1. Проверьте `base` path в `vite.config.ts`
2. Убедитесь, что GitHub Pages включен
3. Проверьте, что branch `gh-pages` существует

## Поддержка

- GitHub Issues: https://github.com/timamikh/tms-driver-mini-app/issues
- Telegram: @Prospase_test_bot

---

**Last Updated**: 29-10-2025
**Version**: 1.0.0

