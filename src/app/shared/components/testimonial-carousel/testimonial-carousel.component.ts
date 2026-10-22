import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import type { Testimonial } from '../../../core/models/models';

@Component({
  selector: 'app-testimonial-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonial-carousel.component.html',
  styleUrl: './testimonial-carousel.component.scss',
})
export class TestimonialCarouselComponent {
  readonly testimonials = input.required<Testimonial[]>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly index = signal(0);
  readonly paused = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;
  private touchStartX: number | null = null;

  readonly count = computed(() => this.testimonials().length);
  readonly dots = computed(() => Array.from({ length: this.count() }, (_, i) => i));

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.startAutoplay();
      }
    });
    this.destroyRef.onDestroy(() => this.stopAutoplay());
  }

  goTo(i: number): void {
    const n = this.count();
    if (!n) return;
    this.index.set(((i % n) + n) % n);
  }

  next(): void {
    this.goTo(this.index() + 1);
    this.restartAutoplay();
  }

  prev(): void {
    this.goTo(this.index() - 1);
    this.restartAutoplay();
  }

  onMouseEnter(): void {
    this.paused.set(true);
  }

  onMouseLeave(): void {
    this.paused.set(false);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX == null) return;
    const dx = (event.changedTouches[0]?.clientX ?? 0) - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(dx) > 50) {
      if (dx < 0) this.next();
      else this.prev();
    }
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.timer = setInterval(() => {
      if (!this.paused() && this.count() > 1) {
        this.goTo((this.index() + 1) % this.count());
      }
    }, 6000);
  }

  private stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private restartAutoplay(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }
}
