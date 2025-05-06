import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function expirationDateGroupValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const monthControl = group.get('month');
    const yearControl = group.get('year');

    const monthRaw = monthControl?.value;
    const yearRaw = yearControl?.value;

    // Počkáme, kým sú zadané obe hodnoty
    if (!monthRaw || !yearRaw || yearRaw.length !== 2) {
      return null;
    }

    const month = +monthRaw;
    const year = +(`20${yearRaw}`);

    if (isNaN(month) || month < 1 || month > 12) {
      return { invalidMonth: true };
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expired: true };
    }

    return null;
  };
}

