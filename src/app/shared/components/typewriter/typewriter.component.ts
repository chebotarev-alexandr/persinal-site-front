import { afterNextRender, ChangeDetectionStrategy, Component, input, OnDestroy, signal } from '@angular/core';

/** Types/deletes words in a loop (used in the hero). */
@Component({
  selector: 'app-typewriter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{ text() }}</span><span class="cursor" aria-hidden="true">|</span>`,
  styles: `
    .cursor {
      color: var(--accent);
      animation: blink 1s step-end infinite;
      font-weight: 400;
    }
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
  `,
})
export class TypewriterComponent implements OnDestroy {
  readonly words = input<string[]>([]);

  protected readonly text = signal('');

  private readonly wordIndex = signal(0);
  private readonly deleting = signal(false);
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Start in the browser only: inputs are bound by now and afterNextRender
    // never runs during SSR (avoiding stray timers on the Node server).
    afterNextRender(() => this.step());
  }

  private step(): void {
    const words = this.words();
    if (words.length === 0) return;

    const word = words[this.wordIndex()];
    const current = this.text();
    let delay = 90;

    if (!this.deleting()) {
      const next = word.slice(0, current.length + 1);
      this.text.set(next);
      if (next === word) {
        this.deleting.set(true);
        delay = 1700;
      }
    } else {
      const next = word.slice(0, current.length - 1);
      this.text.set(next);
      delay = 38;
      if (next === '') {
        this.deleting.set(false);
        this.wordIndex.set((this.wordIndex() + 1) % words.length);
        delay = 260;
      }
    }

    this.timer = setTimeout(() => this.step(), delay);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
