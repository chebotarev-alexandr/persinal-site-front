import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  isDevMode,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ChatService } from '../../../core/services/chat.service';
import type { ChatMessage } from '../../../core/models/models';

const UID_KEY = 'code_orbit_chat_uid';
const SHOW_DELAY_MS = 10_000;
const POLL_MS = 3_000;

@Component({
  selector: 'app-chat-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent implements OnDestroy {
  private readonly chat = inject(ChatService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollEl = viewChild<ElementRef>('scroll');

  readonly visible = signal(false);
  readonly open = signal(false);
  readonly uid = signal<string | null>(null);
  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly sending = signal(false);
  readonly unread = signal(0);

  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private lastId = 0;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.showTimer = setTimeout(() => this.visible.set(true), SHOW_DELAY_MS);
      const stored = localStorage.getItem(UID_KEY);
      if (stored) {
        this.uid.set(stored);
        this.refresh();
        this.startPolling();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.pollTimer) clearInterval(this.pollTimer);
  }

  toggle(): void {
    this.open.set(!this.open());
    if (this.open()) {
      this.unread.set(0);
      this.scrollToBottom();
    }
  }

  async send(): Promise<void> {
    const text = this.draft().trim();
    if (!text || this.sending()) return;
    this.sending.set(true);
    try {
      const res = await firstValueFrom(this.chat.send(this.uid(), text));
      this.uid.set(res.uid);
      if (isPlatformBrowser(this.platformId)) localStorage.setItem(UID_KEY, res.uid);
      this.messages.update((m) => [...m, res.message]);
      this.lastId = Math.max(this.lastId, res.message.id);
      this.draft.set('');
      this.scrollToBottom();
      this.startPolling();
    } catch {
      // keep the draft so the user can retry
    } finally {
      this.sending.set(false);
    }
  }

  private startPolling(): void {
    if (this.pollTimer) return;
    this.pollTimer = setInterval(() => this.refresh(), POLL_MS);
  }

  private async refresh(): Promise<void> {
    const uid = this.uid();
    if (!uid) return;
    try {
      const res = await firstValueFrom(this.chat.messages(uid));
      const msgs = res.messages;
      const newLast = msgs.length ? msgs[msgs.length - 1].id : 0;
      if (newLast !== this.lastId) {
        const newOutgoing = msgs.filter(
          (m) => m.id > this.lastId && m.direction === 'outgoing',
        );
        this.messages.set(msgs);
        if (newOutgoing.length && !this.open()) {
          this.unread.update((u) => u + newOutgoing.length);
        }
        this.lastId = newLast;
        if (this.open()) this.scrollToBottom();
      }
    } catch {
      if (isDevMode()) console.warn('[chat] poll failed');
    }
  }

  private scrollToBottom(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      const el = this.scrollEl()?.nativeElement as HTMLElement | undefined;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }
}
