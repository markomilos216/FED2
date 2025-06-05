import { Component } from '@angular/core';
import { Basket } from '../../../../Models/Basket';
import { CartService } from '../../../../Services/cart.service';
import { OrderService } from '../../../../Services/order.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  basketItems: Basket[] = []
  basketTotalPrice!: number
  shippingAndPayment!: {shipping: string, payment: string}
  shippingPirce!: number
  paymentPrice!: number

  constructor(private cartSevice: CartService, private orderService: OrderService){}

  ngOnInit(){
    this.basketItems = JSON.parse(localStorage.getItem('cart') || '[]')
    this.shippingAndPayment = JSON.parse(localStorage.getItem('shippingAndPayment')|| '[]')
    this.basketTotalPrice = this.cartSevice.getTotalPrice()
    this.shippingPirce = this.orderService.shippingPrices[this.shippingAndPayment.shipping]
    this.paymentPrice = this.orderService.paymentPrices[this.shippingAndPayment.payment]
  }

  countTotalPrice(){
    return this.basketTotalPrice + this.orderService.shippingPrices[this.shippingAndPayment.shipping] + this.orderService.paymentPrices[this.shippingAndPayment.payment]
  }

}
