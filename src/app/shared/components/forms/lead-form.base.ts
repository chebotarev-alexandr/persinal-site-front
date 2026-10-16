import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';

import { mapApiError } from '../../../core/services/api-error';

/**
 * Shared submit lifecycle for lead forms: client validation, submit,
 * server-side field errors, success state.
 */
export abstract class LeadFormBase {
  abstract readonly form: FormGroup;

  readonly submitting = signal(false);
  readonly success = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private readonly fieldErrors = signal<Record<string, string>>({});

  protected abstract send(): Observable<unknown>;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.success.set(false);
    this.errorMessage.set(null);
    this.fieldErrors.set({});

    this.send().subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.set(true);
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        const mapped = mapApiError(err);
        this.fieldErrors.set(mapped.fieldErrors);
        this.errorMessage.set(mapped.message);
      },
    });
  }

  /** Server field error, falling back to a client-side validation message. */
  error(name: string): string | null {
    const server = this.fieldErrors()[name];
    if (server) return server;

    const control = this.form.get(name);
    if (control && control.touched && control.invalid) {
      if (control.errors?.['required']) return 'Обязательное поле';
      if (control.errors?.['email']) return 'Некорректный email';
      if (control.errors?.['phone']) return 'Некорректный номер';
    }
    return null;
  }
}
