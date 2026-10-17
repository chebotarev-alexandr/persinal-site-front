import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Brand mark: code glyph on an accent-gradient rounded square. */
@Component({
  selector: 'app-logo-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.94 13.27C9.26 14.29 8.32 15.12 7.22 15.67C7.12 15.72 7 15.75 6.89 15.75C6.61 15.75 6.35 15.6 6.22 15.34C6.03 14.97 6.18 14.52 6.56 14.33C7.43 13.9 8.17 13.24 8.7 12.44C8.88 12.17 8.88 11.83 8.7 11.56C8.16 10.76 7.42 10.1 6.56 9.67C6.18 9.49 6.03 9.04 6.22 8.66C6.4 8.29 6.85 8.14 7.22 8.33C8.32 8.88 9.26 9.71 9.94 10.73C10.46 11.5 10.46 12.5 9.94 13.27Z"
          fill="currentColor"
        />
        <path
          d="M17 15.75H13C12.59 15.75 12.25 15.41 12.25 15C12.25 14.59 12.59 14.25 13 14.25H17C17.41 14.25 17.75 14.59 17.75 15C17.75 15.41 17.41 15.75 17 15.75Z"
          fill="currentColor"
        />
      </svg>
    </span>
  `,
  styles: `
    .brand-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 2rem;
      height: 2rem;
      border-radius: 0.6rem;
      color: var(--accent-contrast);
      background: linear-gradient(130deg, var(--accent), var(--accent-2));
    }
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  `,
})
export class LogoMarkComponent {}
