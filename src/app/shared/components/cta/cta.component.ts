import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../../core/services/content.service';
import { RevealDirective } from '../../directives/reveal.directive';

/** Reusable "let's talk" call-to-action band. */
@Component({
  selector: 'app-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="cta" appReveal>
      <div class="container">
        <div class="cta-inner">
          <h2 class="cta-title">Есть проект? <span class="gradient-text">Обсудим.</span></h2>
          <p class="cta-text">
            Расскажите о задаче — предложу решение, оценку сроков и стоимости. Бесплатно.
          </p>
          <div class="cta-actions">
            <a class="btn btn-primary" routerLink="/contact">Обсудить проект</a>
            @if (content.site.value()?.settings?.telegram) {
              <a
                class="btn btn-outline"
                [href]="content.site.value()?.settings?.telegram"
                target="_blank"
                rel="noopener"
              >
                Написать в Telegram
              </a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cta {
      padding-block: 4rem;
    }
    .cta-inner {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
      padding: 3rem 2rem;
      text-align: center;
      border: 1px solid var(--border);
      background:
        linear-gradient(120deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%),
        var(--surface);
    }
    .cta-title {
      font-size: clamp(1.5rem, 3vw, 2.25rem);
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .cta-text {
      margin: 0.75rem auto 1.75rem;
      max-width: 36rem;
      color: var(--text-muted);
      line-height: 1.7;
    }
    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
    }
  `,
})
export class CtaComponent {
  protected readonly content = inject(ContentService);
}
