import { RenderMode, ServerRoute } from '@angular/ssr';

// Dynamic server rendering: every request is rendered server-side with fresh
// API data (required for search engines like Yandex to see the content).
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
