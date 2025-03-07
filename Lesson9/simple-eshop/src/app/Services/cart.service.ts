import { Injectable } from '@angular/core';
import { CartItem } from '../Models/CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []
  cartItemsSubject = new BehaviorSubject<CartItem[]>([])

  constructor(){
    this.loadCart()
  }

  loadCart(){
    const savedCart = localStorage.getItem('cart')
    this.cartItems = savedCart ? JSON.parse(savedCart) : []
    this.cartItemsSubject.next(this.cartItems)
  }

  addItemToCart(item: CartItem){
    const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id)

    if(existingItem){
      existingItem.quantity += item.quantity
    }else{
      this.cartItems.push(item)
    }
    this.cartItemsSubject.next(this.cartItems)
    this.updateLocalStorage()
  }

  updateLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
  }

  getCartItems(){
    return this.cartItemsSubject.asObservable()
  }

  getTotalPrice(){
    const totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    return Math.round(totalPrice * 100) / 100
  }

  removeItemFromCart(itemId: string){
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
    this.cartItemsSubject.next(this.cartItems)
    this.updateLocalStorage()
  }

  getCartItemsQuantity(){
    return this.cartItems.reduce((total, item) => total + item.quantity, 0)
  }
}
