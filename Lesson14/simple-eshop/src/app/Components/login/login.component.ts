import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../Models/AuthResponse';
import { SnackBarService } from '../../Services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authObservable!: Observable<AuthResponse>

  constructor(private authService: AuthService, private snackBarService: SnackBarService, private router: Router){}
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  
  logIn(){
    this.authService.logIn(this.loginForm).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.idToken)
        this.snackBarService.showSnackBar('Login successful! Welcome back.', 'success')
        this.router.navigate(['/home'])
      },
      error: (errorMessage) => {
        this.snackBarService.showSnackBar(errorMessage, 'error')
      }
    })
  }

}
