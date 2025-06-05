import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../Services/contact.service';
import { SnackBarService } from '../../Services/snack-bar.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    subject: new FormControl('', [Validators.required, Validators.minLength(5)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    personalDataAgreement: new FormControl(false, Validators.requiredTrue)
  })
  isPersonalDataConfirmed!: boolean

  constructor(private contactService: ContactService, private snackBarService: SnackBarService) {}

  onSubmit(){
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched()
      return
    }
    
    this.sendEmail()
  }

  sendEmail() {
    const to = this.contactForm.value.email;
    const subject = this.contactForm.value.subject;
    const text = this.contactForm.value.message;

    this.contactService.sendEmail(to, subject, text).subscribe({
      next: () => {
        this.snackBarService.showSnackBar('Message send successfully!', 'success')
         this.contactForm.reset()
      },
      error: () => this.snackBarService.showSnackBar('Something went wrong! Try again later.', 'error')
    });
  }
}
