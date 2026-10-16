import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { ContentService } from '../../core/services/content.service';
import { OrderFormComponent } from '../../shared/components/forms/order-form.component';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import type { Service } from '../../core/models/models';
import { formatPrice } from '../../shared/format';

@Component({
  selector: 'app-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, OrderFormComponent, CtaComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss',
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly slug = toSignal(this.route.params.pipe(map((p) => p['slug'] as string)));

  readonly service = httpResource<Service>(() => {
    const slug = this.slug();
    return slug ? `${this.content.apiUrl}/services/${slug}/` : undefined;
  });

  protected readonly formatPrice = formatPrice;

  priceLabel(service: Service): string {
    if (service.price_type === 'fixed' && service.price != null) return formatPrice(service.price);
    if (service.price_from != null) return `от ${formatPrice(service.price_from)}`;
    return 'По договорённости';
  }
}
