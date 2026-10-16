import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import type { SiteSettings } from '../models/models';

/** Keeps document <title>/<meta> and the runtime accent color in sync with the API. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  applySiteSettings(settings: SiteSettings | undefined): void {
    if (!settings) return;

    const title = settings.meta_title || settings.site_name;
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: settings.meta_description || settings.description });

    document.documentElement.style.setProperty('--accent', settings.accent_color || '#6366f1');

    if (settings.analytics_code) {
      this.injectAnalytics(settings.analytics_code);
    }
  }

  setPage(title: string, description?: string): void {
    this.title.setTitle(title);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }

  private injectAnalytics(code: string): void {
    const id = 'site-analytics';
    if (document.getElementById(id)) return;

    const el = document.createElement('script');
    el.id = id;
    el.textContent = code;
    document.head.appendChild(el);
  }
}
