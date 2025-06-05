import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();

    if (!value) {
      return { required: true };
    }

    const parts = value.split(' ').filter((part: string) => part.length > 0);

    if (parts.length !== 2) {
      return { invalidFullName: true };
    }

    const [firstName, lastName] = parts;

    if (firstName.length < 3 || lastName.length < 3) {
      return { tooShort: true };
    }

    const nameRegex = /^[A-Za-zÁČĎÉĚÍĽĹŇÓÔÖŔŘŠŤÚŮÜÝŽáčďéěíľĺňóôöŕřšťúůüýž]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return { invalidCharacters: true };
    }

    return null;
  };
}
