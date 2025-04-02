import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  showDropdownMenu: boolean = false
  showUserDropdownMenu: boolean = false
  isLoggedIn: boolean = false
  numberOfCartItems: number = 0
  user: User | null = null
  destroySubscription: Subject<boolean> = new Subject<boolean>()
  private userSubject!: Subscription

  constructor(private router: Router, private cartService: CartService, private authService: AuthService){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.showDropdownMenu = false;
        this.showUserDropdownMenu = false;
      }
    })
  }

  ngOnInit(): void{
    this.cartService.getCartItems().pipe(
      takeUntil(this.destroySubscription)
    ).subscribe(() => {
      this.numberOfCartItems = this.cartService.getCartItemsQuantity()
    })

    this.userSubject = this.authService.user.subscribe((user: User | null) => {
      this.isLoggedIn = user ? true : false
      this.user = user      
    })
  }

  onLogOut(){
    this.authService.logOut()
  }

  onShowDropdownMenu(){
    if(this.showUserDropdownMenu){
      this.showUserDropdownMenu = false
    }
    setTimeout(() => {
      this.showDropdownMenu = !this.showDropdownMenu 
    },200)
  }

  onShowUserDropdownMenu(){
    if(this.showDropdownMenu){
      this.showDropdownMenu = false
    }
    setTimeout(() => {
      this.showUserDropdownMenu = !this.showUserDropdownMenu
    }, 200)
  }

  ngOnDestroy(){
    this.destroySubscription.unsubscribe()
    this.userSubject.unsubscribe()
  }
}
