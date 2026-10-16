# Personal Site — Frontend

Продающий персональный сайт разработчика. Фронтенд на **Angular 22** (standalone
components, signals, zoneless change detection) + **Tailwind CSS 4**. Весь контент
приходит с бэкенда через REST API и редактируется в админке Django.

## Стек

- Angular 22.2, TypeScript 6, zoneless change detection
- Tailwind CSS 4 (CSS-first конфигурация, PostCSS)
- Signals + `httpResource` для состояния, ленивая загрузка маршрутов

## Быстрый старт

```bash
npm install
npm start            # http://localhost:4200
```

API-адрес задаётся в `src/environments/environment.ts` (dev) и
`environment.prod.ts` (prod — относительный `/api/v1`, предполагает reverse-proxy).

## Структура

```
src/app/
├── core/            модели (API-типы) и сервисы (контент, заявки, SEO)
├── shared/          переиспользуемое: шапка, подвал, карточки, формы, директивы
└── features/        страницы (home, services, projects, about, blog, faq, contact)
```

## Страницы

| Маршрут | Содержимое |
|---|---|
| `/` | Hero, услуги, процесс, проекты, отзывы, CTA |
| `/services`, `/services/:slug` | Услуги по категориям, тарифы, форма заказа |
| `/projects`, `/projects/:slug` | Портфолио с фильтром по тегам |
| `/about` | Обо мне, навыки, стек |
| `/blog`, `/blog/:slug` | Статьи |
| `/faq` | Вопросы-ответы (аккордеон) |
| `/contact` | Контакты + 4 формы заявок (обратная связь, звонок, бриф, консультация) |

Подписка на рассылку — в подвале. Заказ услуги — на странице услуги.

## Сборка и продакшен

```bash
npm run build        # production-сборка в dist/
```

См. `Dockerfile` (node → nginx) и `nginx.conf` (SPA-fallback + прокси `/api/` и
`/media/` на бэкенд).

```bash
docker build -t personal-site-front .
docker run -p 8080:80 personal-site-front
```
