import { Injectable } from '@angular/core';

interface SmartCaptchaApi {
  render(container: HTMLElement, options: Record<string, unknown>): number;
  execute(widgetId?: number): void;
}

/**
 * Loads the Yandex SmartCaptcha script and renders one invisible widget.
 * On submit it calls `execute()`, and the token arrives via the render
 * `callback`; the backend only enforces it on repeat submissions from the
 * same IP (LEAD_RATE_LIMIT_PER_DAY).
 */
@Injectable({ providedIn: 'root' })
export class SmartCaptchaService {
  private clientKey = '';
  private widgetId: number | null = null;
  private pending: ((token: string) => void) | null = null;

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
    script.src = 'https://smartcaptcha.cloud.yandex.ru/captcha.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  /** Starts the check and resolves to a token, or '' when captcha is unavailable. */
  getToken(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.clientKey) {
        resolve('');
        return;
      }
      this.withApi(
        (sc) => {
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
              callback: (token: string) => this.onToken(token),
            });
          }
          this.pending = resolve;
          sc.execute(this.widgetId);
          // Fallback: если проверка не завершилась за 30 с — резолвим пустым.
          setTimeout(() => this.onToken(''), 30000);
        },
        () => resolve(''),
      );
    });
  }

  private onToken(token: string): void {
    if (this.pending) {
      const resolve = this.pending;
      this.pending = null;
      resolve(token || '');
    }
  }

  /** Waits for the script to load (up to ~5 s), then invokes cb or onTimeout. */
  private withApi(cb: (sc: SmartCaptchaApi) => void, onTimeout: () => void): void {
    const api = (): SmartCaptchaApi | undefined =>
      (window as unknown as { smartCaptcha?: SmartCaptchaApi }).smartCaptcha;

    const sc = api();
    if (sc) {
      cb(sc);
      return;
    }

    let tries = 0;
    const timer = setInterval(() => {
      const loaded = api();
      if (loaded) {
        clearInterval(timer);
        cb(loaded);
      } else if (++tries >= 50) {
        clearInterval(timer);
        onTimeout();
      }
    }, 100);
  }
}
