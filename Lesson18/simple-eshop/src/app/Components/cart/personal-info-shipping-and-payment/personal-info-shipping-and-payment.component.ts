import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ShippingAndPaymentComponent } from './shipping-and-payment/shipping-and-payment.component';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { ProgressBarService } from '../../../Services/progress-bar.service';

@Component({
  selector: 'app-personal-info-shipping-and-payment',
  templateUrl: './personal-info-shipping-and-payment.component.html',
  styleUrl: './personal-info-shipping-and-payment.component.css'
})
export class PersonalInfoShippingAndPaymentComponent implements OnInit{
  @ViewChild('personalInfoForm') personalInfoForm!: PersonalInfoComponent
  @ViewChild('shippingAndPaymentForm') shippingAndPaymentForm!: ShippingAndPaymentComponent

  constructor(private authService: AuthService, private router: Router, private progressBarService: ProgressBarService){}

  ngOnInit(){
    this.progressBarService.setStep('shipping')
  }

  onProceed(){
    this.personalInfoForm.onSubmit();

    const addressForm = this.personalInfoForm.shippingAddressForm
    if (addressForm.invalid) {
      addressForm.markAllAsTouched()
      return
    }

    if (addressForm.get('rememberMe')?.value) {    
      this.authService.addAddress(addressForm)
    }    

    localStorage.setItem('deliveryAddress', JSON.stringify(addressForm.value))
    this.router.navigate(['/cart/payment-and-summary'])
  }
}
