import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../core/services/content.service';
import type { Service, ServiceCategory } from '../../core/models/models';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { formatPrice } from '../../shared/format';

interface CategoryGroup {
  key: string;
  category: ServiceCategory | null;
  services: Service[];
}

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SectionHeadingComponent, CtaComponent, ServiceCardComponent, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  private readonly content = inject(ContentService);

  readonly pricing = computed(() => this.content.pricing.value() ?? []);
  readonly process = computed(() => this.content.process.value() ?? []);

  readonly grouped = computed<CategoryGroup[]>(() => {
    const map = new Map<string, CategoryGroup>();
    for (const service of this.content.servicesList()) {
      const key = service.category_slug ?? '';
      if (!map.has(key)) {
        map.set(key, { key, category: service.category, services: [] });
      }
      map.get(key)!.services.push(service);
    }
    return Array.from(map.values());
  });

  protected readonly formatPrice = formatPrice;
}
