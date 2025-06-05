import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../../Services/order.service';
import { Order } from '../../../../Models/Order';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit, OnDestroy{
  allOrders: Order[] = []
  selectedOrder?: Order
  orderId: string | null = ''
  orderSub!: Subscription
  orderShippingPrice!: number
  orderPaymentPrice!: number
  totoalPrice!: number
  orderStatus!: string | undefined

  constructor(private orderService: OrderService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.orderId = params.get('id')
    })

    this.orderService.loadOrders()
    this.orderSub = this.orderService.getOrders().subscribe(orders => {
      this.allOrders = orders
      this.selectedOrder = this.allOrders.find(order => order.id == this.orderId)
      if(this.selectedOrder){
        const shippingKey = this.selectedOrder.shipping?.shipping ?? ''
        const paymentKey = this.selectedOrder.shipping?.payment ?? ''
        this.orderShippingPrice = this.orderService.shippingPrices[shippingKey] ?? 0
        this.orderPaymentPrice = this.orderService.paymentPrices[paymentKey] ?? 0

        const basePrice = this.selectedOrder.totalPrice ?? '0'

        this.totoalPrice = basePrice + this.orderShippingPrice + this.orderPaymentPrice
        this.orderStatus = this.selectedOrder.status 
      } 
    })
  }

  onStatusChange(){
    this.orderService.changeOrderStatus(this.selectedOrder?.id, this.orderStatus)
  }

  ngOnDestroy(){
    this.orderSub.unsubscribe()
  }
}
