import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { Subscription } from 'rxjs';
import { Order } from '../../../Models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit, OnDestroy{
  orders: Order[] = []
  orderSub!: Subscription
  
  constructor(private orderService: OrderService, private router: Router){}

  ngOnInit(){
    this.orderService.loadOrders()
    this.orderSub = this.orderService.orders.subscribe(order => {
      this.orders = order
    })
  }

  onOrderDetail(productId: string){
    this.router.navigate(['/my-account/order-detail', productId])
  }

  getStatusClass(status: string | undefined){
    switch(status){
      case 'Pending':
        return 'status-pending'
      case 'Processing':
        return 'status-processing'
      case 'Shipped':
        return 'status-shipped'
      case 'Delivered':
        return 'status-delivered'
      default:
        return ''
    }
  }

  ngOnDestroy(){
    this.orderSub.unsubscribe()
  }
}

