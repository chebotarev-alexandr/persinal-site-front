import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ContentService } from '../../../core/services/content.service';
import { LogoMarkComponent } from '../logo-mark/logo-mark.component';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LogoMarkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly content = inject(ContentService);

  readonly menuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Услуги', path: '/services' },
    { label: 'Проекты', path: '/projects' },
    { label: 'Обо мне', path: '/about' },
    { label: 'Блог', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
  ];

  readonly siteName = computed(() => this.content.site.value()?.settings?.site_name ?? '…');
  readonly logo = computed(() => this.content.site.value()?.settings?.logo ?? null);

  toggle(): void {
    this.menuOpen.update((v) => !v);
  }

  close(): void {
    this.menuOpen.set(false);
  }
}
