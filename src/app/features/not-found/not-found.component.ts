import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="nf">
      <div class="container">
        <div class="nf-code gradient-text">404</div>
        <h1 class="nf-title">Страница не найдена</h1>
        <p class="nf-text">Такой страницы нет — но можно вернуться на главную или посмотреть услуги.</p>
        <div class="nf-actions">
          <a class="btn btn-primary" routerLink="/">На главную</a>
          <a class="btn btn-outline" routerLink="/services">Услуги</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .nf {
      padding: 6rem 0;
      text-align: center;
    }
    .nf-code {
      font-size: clamp(4rem, 12vw, 8rem);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.04em;
    }
    .nf-title {
      margin-top: 1rem;
      font-size: 1.75rem;
      font-weight: 800;
    }
    .nf-text {
      margin: 0.75rem auto 2rem;
      max-width: 28rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    .nf-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }
  `,
})
export class NotFoundComponent {}
