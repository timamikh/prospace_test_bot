# 🎯 Инициализация Git репозитория и деплой

## Шаг 1: Инициализация Git репозитория

```bash
# Перейдите в директорию проекта
cd C:\Projects\Prospacre_test_bot

# Инициализируйте git (если еще не инициализирован)
git init

# Добавьте все файлы
git add .

# Создайте первый commit
git commit -m "Initial commit: TMS Driver Mini App - Full implementation"
```

## Шаг 2: Создание репозитория на GitHub

### Вариант A: Через веб-интерфейс

1. Откройте https://github.com/new
2. Repository name: `tms-driver-mini-app`
3. Description: `Telegram Mini App для водителей TMS системы`
4. Visibility: Public (или Private по вашему выбору)
5. **НЕ** инициализируйте с README, .gitignore или License (они уже есть в проекте)
6. Нажмите "Create repository"

### Вариант B: Через GitHub CLI (если установлен)

```bash
gh repo create tms-driver-mini-app --public --source=. --remote=origin --push
```

## Шаг 3: Привязка к удаленному репозиторию

```bash
# Добавьте удаленный репозиторий
git remote add origin https://github.com/timamikh/tms-driver-mini-app.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Отправьте код на GitHub
git push -u origin main
```

## Шаг 4: Настройка GitHub Secrets

1. Перейдите в ваш репозиторий на GitHub
2. Settings → Secrets and variables → Actions
3. Нажмите "New repository secret"
4. Добавьте следующие secrets:

### Secret 1: VITE_TELEGRAM_BOT_TOKEN
```
Name: VITE_TELEGRAM_BOT_TOKEN
Secret: 8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE
```

### Secret 2: VITE_TELEGRAM_BOT_USERNAME
```
Name: VITE_TELEGRAM_BOT_USERNAME
Secret: Prospase_test_bot
```

### Secret 3: VITE_API_BASE_URL
```
Name: VITE_API_BASE_URL
Secret: https://api.yourdomain.com
(замените на ваш реальный API URL)
```

## Шаг 5: Настройка base path для GitHub Pages

Обновите `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/tms-driver-mini-app/', // Добавьте эту строку
  plugins: [
    // ... остальные плагины
  ],
  // ... остальная конфигурация
});
```

Сохраните и закоммитьте изменения:

```bash
git add vite.config.ts
git commit -m "Configure base path for GitHub Pages"
git push
```

## Шаг 6: Включение GitHub Pages

1. Перейдите в Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: Выберите **gh-pages** (появится после первого деплоя) и **/ (root)**
4. Save

**Примечание**: ветка `gh-pages` будет создана автоматически при первом запуске GitHub Actions workflow.

## Шаг 7: Запуск деплоя

GitHub Actions автоматически запустится при push в main ветку.

Проверьте статус:
1. Перейдите во вкладку **Actions**
2. Найдите workflow "Deploy TMS Driver Mini App"
3. Дождитесь завершения (обычно 2-3 минуты)

## Шаг 8: Проверка деплоя

После успешного деплоя ваше приложение будет доступно по адресу:

```
https://timamikh.github.io/tms-driver-mini-app/
```

## Шаг 9: Настройка Telegram Bot

### Через @BotFather:

1. Откройте Telegram и найдите @BotFather
2. Отправьте команду: `/mybots`
3. Выберите: @Prospase_test_bot
4. Выберите: **Bot Settings**
5. Выберите: **Menu Button**
6. Выберите: **Configure menu button**
7. Введите URL: `https://timamikh.github.io/tms-driver-mini-app/`
8. Введите название кнопки (например: "Открыть приложение")

### Через API (альтернатива):

```bash
curl -X POST "https://api.telegram.org/bot8406287846:AAEDeB5cOzsRrvCCMunzUHGqNI8W_LkwhnE/setWebAppInfo" \
-H "Content-Type: application/json" \
-d '{"url": "https://timamikh.github.io/tms-driver-mini-app/"}'
```

## Шаг 10: Тестирование

1. Откройте Telegram (мобильное приложение или десктоп)
2. Найдите бота: @Prospase_test_bot
3. Нажмите на кнопку меню (☰) внизу
4. Выберите "Открыть приложение"
5. Приложение должно открыться в Mini App

## 📝 Дополнительные команды

### Просмотр статуса git

```bash
git status
```

### Просмотр истории коммитов

```bash
git log --oneline
```

### Создание новой ветки для разработки

```bash
git checkout -b feature/new-feature
```

### Обновление удаленного репозитория

```bash
git pull origin main
```

## 🔄 Workflow обновления

При каждом изменении кода:

```bash
# 1. Внесите изменения в код

# 2. Добавьте измененные файлы
git add .

# 3. Создайте commit
git commit -m "Описание изменений"

# 4. Отправьте на GitHub
git push

# 5. GitHub Actions автоматически задеплоит обновления
```

## ⚠️ Troubleshooting

### Ошибка: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/timamikh/tms-driver-mini-app.git
```

### Ошибка: "refusing to merge unrelated histories"

```bash
git pull origin main --allow-unrelated-histories
```

### GitHub Actions workflow не запускается

1. Проверьте наличие файла `.github/workflows/deploy.yml`
2. Убедитесь что вы push-нули в ветку `main`
3. Проверьте права доступа в Settings → Actions

### 404 ошибка при открытии приложения

1. Убедитесь что GitHub Pages включен
2. Проверьте что `base` path в `vite.config.ts` соответствует имени репозитория
3. Подождите несколько минут после деплоя

## 📊 Мониторинг

### Проверка статуса деплоя

```bash
# Через GitHub CLI
gh workflow list
gh run list
```

### Просмотр логов последнего run

```bash
gh run view
```

## 🎉 Готово!

Теперь ваше приложение:
- ✅ Размещено на GitHub
- ✅ Автоматически деплоится при изменениях
- ✅ Доступно через Telegram Mini App
- ✅ Готово к использованию

## 📚 Следующие шаги

1. Подключите реальный backend API
2. Настройте домен (опционально)
3. Добавьте analytics и error tracking
4. Проведите тестирование на разных устройствах
5. Соберите feedback от пользователей

---

**Last Updated**: 29-10-2025

