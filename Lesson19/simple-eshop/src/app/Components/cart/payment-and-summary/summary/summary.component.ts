import { Component } from '@angular/core';
import { Basket } from '../../../../Models/Basket';
import { CartService } from '../../../../Services/cart.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  basketItems: Basket[] = []
  basketTotalPrice!: number
  shippingAndPayment!: {shipping: string, payment: string}
  shippingPrices: {[key: string]: number} ={
    'Store Pickup': 0,
    'GLS': 4.80,
    'Slovak Post': 6.30
  }
  paymentPrices: {[key: string]: number} ={
    'Credit/Debit Card': 0,
    'Cash on Delivery': 2.99
  }

  constructor(private cartSevice: CartService){}

  ngOnInit(){
    this.basketItems = JSON.parse(localStorage.getItem('cart') || '[]')
    this.shippingAndPayment = JSON.parse(localStorage.getItem('shippingAndPayment')|| '[]')
    this.basketTotalPrice = this.cartSevice.getTotalPrice()
  }

  countTotalPrice(){
    return this.basketTotalPrice + this.shippingPrices[this.shippingAndPayment.shipping] + this.paymentPrices[this.shippingAndPayment.payment]
  }

}
