import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import { SocialIconComponent } from '../../shared/components/social-icon/social-icon.component';
import { ContactFormComponent } from '../../shared/components/forms/contact-form.component';
import { CallbackFormComponent } from '../../shared/components/forms/callback-form.component';
import { BriefFormComponent } from '../../shared/components/forms/brief-form.component';
import { ConsultationFormComponent } from '../../shared/components/forms/consultation-form.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

type FormTab = 'contact' | 'callback' | 'brief' | 'consultation';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SocialIconComponent,
    ContactFormComponent,
    CallbackFormComponent,
    BriefFormComponent,
    ConsultationFormComponent,
    RevealDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly content = inject(ContentService);

  readonly settings = computed(() => this.content.site.value()?.settings);
  readonly socials = computed(() => this.content.site.value()?.socials ?? []);

  readonly activeTab = signal<FormTab>('contact');

  readonly tabs: { id: FormTab; label: string }[] = [
    { id: 'contact', label: 'Обратная связь' },
    { id: 'callback', label: 'Заказать звонок' },
    { id: 'brief', label: 'Бриф на разработку' },
    { id: 'consultation', label: 'Консультация' },
  ];

  setTab(id: FormTab): void {
    this.activeTab.set(id);
  }
}
