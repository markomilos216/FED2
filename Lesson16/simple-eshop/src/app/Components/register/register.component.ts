import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../Validators/password.validator';
import { passwordMatchValidator } from '../../Validators/password-match.validator';
import { AuthService } from '../../Services/auth.service';
import { SnackBarService } from '../../Services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isPasswordMatch: boolean = true
    
  constructor(private authService: AuthService, private snackBarService: SnackBarService, private router: Router){}
  
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(\\+?[0-9]{1,3})?[0-9]{9,15}$')]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    passwordCheck: new FormControl('', Validators.required)
  }, { validators: passwordMatchValidator('password', 'passwordCheck')})

  onRegister(){
    this.isPasswordMatch = this.registerForm.get('password')?.value === this.registerForm.get('passwordCheck')?.value
    if(!this.isPasswordMatch){     
      return
    }
    
    this.authService.signUp(this.registerForm).subscribe({
      next: () => {
        this.snackBarService.showSnackBar('Your account has been successfully created', 'success')
        this.router.navigate(['/home'])
       },
      error: (errorMessage) => { 
        this.snackBarService.showSnackBar(errorMessage, 'error')
      }
    })    
  }
}


