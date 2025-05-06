import { AuthService } from './../../../Services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../Validators/password.validator';
import { User } from '../../../Models/User';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit, OnDestroy{

  isCurrentPasswordVisible: boolean = false
  isNewPasswordVisible: boolean = false
  isConfirmPasswordVisible: boolean = false
  isCurrentPasswordMatch: boolean = true

  user: User | null = null

  changePasswordForm: FormGroup = new FormGroup({
    'current-password': new FormControl('', Validators.required),
    'new-password': new FormControl('', [Validators.required, passwordValidator]),
    'confirm-password': new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private snackBarService: SnackBarService, private afAuth: AngularFireAuth){}

  ngOnInit(){
    this.authService.getUser().subscribe(user => {
      this.user = user
    })
  }

  onChangePassword() {
    const currentPassword = this.changePasswordForm.value['current-password']
    const newPassword = this.changePasswordForm.value['new-password']
    const confirmPassword = this.changePasswordForm.value['confirm-password']
    if(newPassword === confirmPassword){
      this.authService.changePassword(newPassword, currentPassword);
    }else{
      this.snackBarService.showSnackBar('Passwords do not match', 'error')
    }
  }
  
  toggleCurrentPasswordVisibility(){
    this.isCurrentPasswordVisible = !this.isCurrentPasswordVisible
  }

  toggleNewPasswordVisibility(){
    this.isNewPasswordVisible = !this.isNewPasswordVisible
  }

  toggleConfirmPasswordVisibility(){
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible
  }

  ngOnDestroy(){
    this.changePasswordForm.get('current-password')?.setValue('');
    this.changePasswordForm.get('new-password')?.setValue('');
    this.changePasswordForm.get('confirm-password')?.setValue('');
  }
}
