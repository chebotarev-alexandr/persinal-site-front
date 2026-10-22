import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { ContentService } from '../../core/services/content.service';
import { MarkdownPipe } from '../../shared/markdown.pipe';
import type { Post } from '../../core/models/models';
import { formatDate } from '../../shared/format';

@Component({
  selector: 'app-post-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MarkdownPipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly slug = toSignal(this.route.params.pipe(map((p) => p['slug'] as string)));

  readonly post = httpResource<Post>(() => {
    const slug = this.slug();
    return slug ? `${this.content.apiUrl}/blog/${slug}/` : undefined;
  });

  protected readonly formatDate = formatDate;
}
