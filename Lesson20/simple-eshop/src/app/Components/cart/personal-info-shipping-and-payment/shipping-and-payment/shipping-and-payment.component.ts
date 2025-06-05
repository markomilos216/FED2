import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'shipping-and-payment',
  templateUrl: './shipping-and-payment.component.html',
  styleUrl: './shipping-and-payment.component.css'
})
export class ShippingAndPaymentComponent {
  shippingForm = new FormGroup({
    shipping: new FormControl('Store Pickup')
  })

  paymentForm = new FormGroup({
    payment: new FormControl('Credit/Debit Card')
  })

  onSubmit(){
    let shippingAndPayment = {
      shipping: this.shippingForm.value.shipping,
      payment: this.paymentForm.value.payment
    }
    localStorage.setItem('shippingAndPayment', JSON.stringify(shippingAndPayment))
  }
}
