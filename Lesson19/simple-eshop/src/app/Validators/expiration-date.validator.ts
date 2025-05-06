import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const parts = value.split('/');
    if (parts.length !== 2 || !/^\d{2}$/.test(parts[0]) || !/^\d{2}$/.test(parts[1])) {
      return { invalidFormat: true }; 
    }

    const [monthStr, yearStr] = parts;
    const month = +monthStr;
    const year = +`20${yearStr}`;

    if (month < 1 || month > 12) {
      return { invalidMonth: true }; 
    }

    const inputDate = new Date(year, month - 1, 1);
    const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    return inputDate > currentMonth ? null : { expired: true };
  };
}




  