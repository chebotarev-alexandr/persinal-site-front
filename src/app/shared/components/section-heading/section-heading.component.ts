import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-head" [class.centered]="center()">
      @if (eyebrow()) {
        <span class="section-eyebrow">{{ eyebrow() }}</span>
      }
      @if (title()) {
        <h2 class="section-title">{{ title() }}</h2>
      }
      @if (subtitle()) {
        <p class="section-subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: `
    .section-head {
      margin-bottom: 2.5rem;
      max-width: 46rem;
    }
    .section-head.centered {
      margin-inline: auto;
      text-align: center;
    }
    .section-head.centered .section-subtitle {
      margin-inline: auto;
    }
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input('');
  readonly title = input('');
  readonly subtitle = input('');
  readonly center = input(false, { transform: booleanAttribute });
}
