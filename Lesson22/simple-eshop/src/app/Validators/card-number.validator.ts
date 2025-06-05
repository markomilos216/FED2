import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cardNumberValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const rawValue = control.value;

    if (!rawValue) {
      return { required: true };
    }

    const cleaned = rawValue.replace(/\s+/g, '');

    if (cleaned.length !== 16) {
      return { invalidLength: true };
    }

    if (!/^\d+$/.test(cleaned)) {
      return { invalidCharacters: true };
    }

    return null;
  };
}
