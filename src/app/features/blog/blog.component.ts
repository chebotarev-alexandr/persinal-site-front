import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../core/services/content.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { formatDate } from '../../shared/format';

@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SectionHeadingComponent, RevealDirective],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  private readonly content = inject(ContentService);

  readonly posts = this.content.postsList;

  protected readonly formatDate = formatDate;
}
