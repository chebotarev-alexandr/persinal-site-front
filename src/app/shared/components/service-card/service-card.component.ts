import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Service } from '../../../core/models/models';
import { formatPrice } from '../../format';

@Component({
  selector: 'app-service-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <a class="card service-card" [routerLink]="['/services', service().slug]" [attr.aria-label]="service().title">
      <div class="sc-head">
        <span class="sc-icon" aria-hidden="true">{{ service().icon || '⚡' }}</span>
        <div class="sc-heading">
          <h3 class="sc-title">{{ service().title }}</h3>
          @if (service().duration) {
            <span class="sc-duration">{{ service().duration }}</span>
          }
        </div>
      </div>
      <p class="sc-desc">{{ service().short_description }}</p>
      <div class="sc-foot">
        <span class="sc-price">{{ price() }}</span>
        <span class="sc-cta">Подробнее →</span>
      </div>
    </a>
  `,
  styles: `
    .service-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1.5rem;
      gap: 1rem;
    }
    .sc-head {
      display: flex;
      align-items: center;
      gap: 0.9rem;
    }
    .sc-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 0.75rem;
      font-size: 1.3rem;
      background: color-mix(in srgb, var(--accent) 14%, transparent);
      border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
    }
    .sc-heading {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .sc-title {
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .sc-duration {
      font-size: 0.8rem;
      color: var(--text-faint);
    }
    .sc-desc {
      flex: 1;
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }
    .sc-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
    }
    .sc-price {
      font-weight: 700;
      color: var(--accent);
    }
    .sc-cta {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      transition: color 0.15s ease;
    }
    .service-card:hover .sc-cta {
      color: var(--accent);
    }
  `,
})
export class ServiceCardComponent {
  readonly service = input.required<Service>();

  protected readonly price = computed(() => {
    const s = this.service();
    if (s.price_type === 'fixed' && s.price != null) return formatPrice(s.price);
    if (s.price_from != null) return `от ${formatPrice(s.price_from)}`;
    return 'по договорённости';
  });
}
