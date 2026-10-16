import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Accepts common phone formats; requires 10–15 digits (mirrors backend). */
export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  const digits = String(value).replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15 ? null : { phone: true };
}
