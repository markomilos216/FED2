import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl){
    const password = control.value;
    if(!password){
        return null
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    const errors: ValidationErrors = {}
    if(!hasUpperCase) errors['missingUpperCase'] = true;
    if(!hasLowerCase) errors['missingLowerCase'] = true;
    if(!hasNumber) errors['missingNumber'] = true;
    if(!hasSpecialChar) errors['missingSpecialChar'] = true;
    if(!isValidLength) errors['invalidLength'] = true;

    return Object.keys(errors).length ? errors : null 
}