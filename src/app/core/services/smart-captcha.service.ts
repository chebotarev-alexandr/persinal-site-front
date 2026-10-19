import { Injectable } from '@angular/core';

interface SmartCaptchaApi {
  render(container: HTMLElement, options: Record<string, unknown>): number;
  getToken(widgetId: number, callback: (token: string) => void): void;
}

/**
 * Loads the Yandex SmartCaptcha script and renders one invisible widget.
 * The token is always collected on submit; the backend only validates it on
 * repeat submissions from the same IP (LEAD_RATE_LIMIT_PER_DAY).
 */
@Injectable({ providedIn: 'root' })
export class SmartCaptchaService {
  private clientKey = '';
  private widgetId: number | null = null;

  /** Idempotent: stores the key and starts loading the script once. */
  configure(clientKey: string): void {
    if (!clientKey || this.clientKey) return;
    this.clientKey = clientKey;
    this.ensureScript();
  }

  private ensureScript(): void {
    if (document.getElementById('smartcaptcha-script')) return;
    const script = document.createElement('script');
    script.id = 'smartcaptcha-script';
    script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  /** Resolves to a token, or '' when captcha is unavailable. */
  getToken(): Promise<string> {
    return new Promise((resolve) => {
      const sc = (window as unknown as { smartCaptcha?: SmartCaptchaApi }).smartCaptcha;
      if (!sc || !this.clientKey) {
        resolve('');
        return;
      }
      if (this.widgetId === null) {
        const container = document.createElement('div');
        container.style.width = '0';
        container.style.height = '0';
        container.style.overflow = 'hidden';
        document.body.appendChild(container);
        this.widgetId = sc.render(container, {
          sitekey: this.clientKey,
          invisible: true,
          hl: 'ru',
        });
      }
      sc.getToken(this.widgetId, (token: string) => resolve(token ?? ''));
    });
  }
}
