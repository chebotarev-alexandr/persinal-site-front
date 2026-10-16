import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

/** Fades content in as it scrolls into view (via IntersectionObserver). */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      this.el.classList.add('reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.el.classList.add('is-visible');
              observer.unobserve(this.el);
            }
          }
        },
        { threshold: 0.12 },
      );
      observer.observe(this.el);
    });
  }
}
