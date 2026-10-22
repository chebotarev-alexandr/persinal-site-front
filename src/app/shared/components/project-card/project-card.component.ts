import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Project } from '../../../core/models/models';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <a class="card project-card" [routerLink]="['/projects', project().slug]" [attr.aria-label]="project().title">
      <div class="pc-media">
        @if (project().cover) {
          <img class="pc-cover" [src]="project().cover" [alt]="project().title" loading="lazy" />
        } @else {
          <div class="pc-cover pc-placeholder" aria-hidden="true">
            <span>&lt;/&gt;</span>
          </div>
        }
        <div class="pc-overlay" aria-hidden="true"></div>
        @if (project().url || project().repository_url) {
          <div class="pc-flags">
            @if (project().url) {
              <span class="pc-flag pc-flag-live">● Вживую</span>
            }
            @if (project().repository_url) {
              <span class="pc-flag">GitHub</span>
            }
          </div>
        }
      </div>
      <div class="pc-body">
        @if (project().year) {
          <span class="badge">{{ project().year }}</span>
        }
        <h3 class="pc-title">{{ project().title }}</h3>
        <p class="pc-desc">{{ project().short_description }}</p>
        @if (project().stack.length) {
          <div class="pc-stack">
            @for (tech of project().stack.slice(0, 4); track tech) {
              <span class="chip">{{ tech }}</span>
            }
          </div>
        }
      </div>
    </a>
  `,
  styles: `
    .project-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
    }
    .pc-media {
      position: relative;
      height: 11rem;
      overflow: hidden;
    }
    .pc-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }
    .project-card:hover .pc-cover {
      transform: scale(1.06);
    }
    .pc-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        linear-gradient(180deg, transparent 42%, rgba(7, 11, 20, 0.55) 100%),
        linear-gradient(130deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%);
    }
    .pc-flags {
      position: absolute;
      top: 0.65rem;
      left: 0.65rem;
      display: flex;
      gap: 0.4rem;
    }
    .pc-flag {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      color: #e6ebf4;
      background: rgba(7, 11, 20, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.25);
      backdrop-filter: blur(6px);
    }
    .pc-flag-live {
      color: #34d399;
      border-color: rgba(52, 211, 153, 0.35);
    }
    .pc-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.4rem;
      font-family: monospace;
      color: color-mix(in srgb, var(--accent) 55%, var(--text));
      background:
        linear-gradient(130deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent-3) 14%, transparent)),
        var(--surface);
    }
    .pc-body {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 1.25rem 1.5rem 1.5rem;
      flex: 1;
    }
    .pc-body .badge {
      align-self: flex-start;
    }
    .pc-title {
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .pc-desc {
      flex: 1;
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }
    .pc-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
  `,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
