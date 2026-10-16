import { HttpErrorResponse } from '@angular/common/http';

/** Extract field-level validation errors from a DRF 400 response. */
export interface ApiError {
  fieldErrors: Record<string, string>;
  message: string | null;
}

const DEFAULT_MESSAGE = 'Что-то пошло не так. Попробуйте ещё раз.';

export function mapApiError(error: HttpErrorResponse): ApiError {
  const data = error.error;
  const fieldErrors: Record<string, string> = {};

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        fieldErrors[key] = value.map(String).join(' ');
      } else if (typeof value === 'string') {
        fieldErrors[key] = value;
      }
    }
  }

  const message =
    typeof data?.detail === 'string'
      ? data.detail
      : typeof data === 'string' && data
        ? data
        : null;

  return { fieldErrors, message: message ?? (Object.keys(fieldErrors).length ? null : DEFAULT_MESSAGE) };
}
