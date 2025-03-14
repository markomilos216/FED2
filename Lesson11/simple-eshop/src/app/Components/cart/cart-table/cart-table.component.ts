import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../../Models/CartItem';
import { CartService } from '../../../Services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent implements OnInit, OnDestroy{
  cartItems: CartItem[] = []
  totalPrice: number = 0
  destroySubscribtion: Subject<boolean> = new Subject<boolean>()

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartService.getCartItems().pipe(
      takeUntil(this.destroySubscribtion)
    ).subscribe((items) => {
      this.cartItems = items
      this.updateTotalPrice()
    })
  }

  removeItem(itemId: string){
    this.cartService.removeItemFromCart(itemId)
  }

  decreaseItemQuantity(item: CartItem){
    if(item.quantity > 1){
      this.cartService.changeItemQuantity(item, item.quantity - 1)
    }
  }

  increaseItemQuantity(item: CartItem){
    if(item.quantity < item.stock){
      this.cartService.changeItemQuantity(item, item.quantity + 1)
    }    
  }

  updateTotalPrice(){
    this.totalPrice = this.cartService.getTotalPrice()
  }

  ngOnDestroy(){
    this.destroySubscribtion.next(true)
    this.destroySubscribtion.complete()
  }
}
