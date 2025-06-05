import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders = new BehaviorSubject<Order[]>([])
  shippingPrices: {[key: string]: number} ={
    'Store Pickup': 0,
    'GLS': 4.80,
    'Slovak Post': 6.30
  }
  paymentPrices: {[key: string]: number} ={
    'Credit/Debit Card': 0,
    'Cash on Delivery': 2.99
  }

  constructor(private firestore: AngularFirestore) { }

  getOrders(){
    return this.orders.asObservable()
  }

  loadOrders(){
    this.firestore.collection<Order>('orders').valueChanges({idField: 'id'}).subscribe((orders: Order[]) => {
      this.orders.next(orders)
    })
  }

  changeOrderStatus(orderId: string | undefined, status: string | undefined){
    this.firestore.collection('orders').doc(orderId).update({status: status})
  }


}
