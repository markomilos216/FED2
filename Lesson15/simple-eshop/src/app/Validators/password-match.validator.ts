import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordValue = control.get(password)?.value;
    const confirmPasswordControl = control.get(confirmPassword);

    if (!confirmPasswordControl) return null;

    const confirmPasswordValue = confirmPasswordControl.value;

    if (!confirmPasswordControl.touched || confirmPasswordValue === '') {
      return null;
    }

    const passwordMismatch = passwordValue !== confirmPasswordValue;
    
    confirmPasswordControl.setErrors(passwordMismatch ? { passwordMismatch: true } : null);

    return passwordMismatch ? { passwordMismatch: true } : null;
  };
}
