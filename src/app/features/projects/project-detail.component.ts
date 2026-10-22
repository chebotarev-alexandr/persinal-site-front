import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { ContentService } from '../../core/services/content.service';
import { CtaComponent } from '../../shared/components/cta/cta.component';
import { MarkdownPipe } from '../../shared/markdown.pipe';
import type { Project } from '../../core/models/models';

@Component({
  selector: 'app-project-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CtaComponent, MarkdownPipe],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly slug = toSignal(this.route.params.pipe(map((p) => p['slug'] as string)));

  readonly project = httpResource<Project>(() => {
    const slug = this.slug();
    return slug ? `${this.content.apiUrl}/projects/${slug}/` : undefined;
  });
}
