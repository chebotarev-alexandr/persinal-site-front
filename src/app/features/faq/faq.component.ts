import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  private readonly content = inject(ContentService);

  readonly categories = computed(() => this.content.faq.value() ?? []);
  readonly openId = signal<number | null>(null);

  toggle(id: number): void {
    this.openId.set(this.openId() === id ? null : id);
  }
}
