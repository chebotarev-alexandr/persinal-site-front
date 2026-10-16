import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import type { Technology } from '../../core/models/models';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, CtaComponent, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private readonly content = inject(ContentService);

  readonly about = computed(() => this.content.site.value()?.about);
  readonly skills = computed(() => this.content.skills.value() ?? []);

  readonly techGroups = computed<[string, Technology[]][]>(() => {
    const map = new Map<string, Technology[]>();
    for (const t of this.content.technologies.value() ?? []) {
      const key = t.category_label;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return Array.from(map.entries());
  });
}
