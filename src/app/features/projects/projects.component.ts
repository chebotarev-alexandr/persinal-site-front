import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, CtaComponent, ProjectCardComponent, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly content = inject(ContentService);

  readonly projects = computed(() => this.content.projectsList());
  readonly activeTag = signal<string | null>(null);

  readonly tags = computed(() => {
    const set = new Map<string, string>();
    for (const p of this.projects()) {
      for (const t of p.tags) set.set(t.slug, t.name);
    }
    return Array.from(set.entries());
  });

  readonly filtered = computed(() => {
    const active = this.activeTag();
    if (!active) return this.projects();
    return this.projects().filter((p) => p.tags.some((t) => t.slug === active));
  });

  setTag(slug: string | null): void {
    this.activeTag.set(slug);
  }
}
