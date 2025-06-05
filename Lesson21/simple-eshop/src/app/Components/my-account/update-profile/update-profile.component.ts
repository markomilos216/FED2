import { Component, ViewChild, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../Models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit, OnDestroy{
  constructor(private authService: AuthService){ }
  
  @ViewChild('updateProfileInfoForm') updateForm!: NgForm
  @ViewChild('modalDialog') modalDialog!: ElementRef<HTMLDialogElement>
  @ViewChild('passwordConfirm') confirmPasswordForEmailChange!: ElementRef<HTMLInputElement>
  currentUser!: User | null
  userSubscription!: Subscription
  name: string | undefined = ''
  surname: string | undefined = ''
  email: string | undefined = ''
  phone!: number
  


  ngOnInit(){
    this.userSubscription = this.authService.getUser().subscribe(user => {
      this.currentUser = user
    })
    this.updateInputValuesOnLoad()
  }

  updateInputValuesOnLoad(){
    this.name = this.currentUser?.name
    this.surname = this.currentUser?.surname
    this.email = this.currentUser?.email
    this.phone = Number(this.currentUser?.phone)
  }

  onUpdateUserProfileInfo(){
    if(this.email !== this.authService.authUser.email){
      this.modalDialog.nativeElement.showModal()
    }else{
      this.authService.changeUserInfoWihoutEmail(this.name, this.surname, this.email, this.phone, this.currentUser?.role, this.currentUser?.id)
    }
  }

  onSubmitPasswordForEmailChange(){
    this.authService.changeUserInfoWithEmail(this.name, this.surname, this.email, this.phone, this.currentUser?.role, this.currentUser?.id, this.confirmPasswordForEmailChange.nativeElement.value)
    this.closeModal()
    this.confirmPasswordForEmailChange.nativeElement.value = ''
  }

  closeModal(){
    this.modalDialog.nativeElement.close()
  }
  
  ngOnDestroy(){
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
