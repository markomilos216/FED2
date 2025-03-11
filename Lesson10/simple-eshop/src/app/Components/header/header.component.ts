import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  showDropdownMenu: boolean = false
  numberOfCartItems: number = 0
  destroySubscription: Subject<boolean> = new Subject<boolean>()

  constructor(private router: Router, private cartService: CartService){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.showDropdownMenu = false;
      }
    })
  }

  ngOnInit(): void{
    this.cartService.getCartItems().pipe(
      takeUntil(this.destroySubscription)
    ).subscribe(() => {
      this.numberOfCartItems = this.cartService.getCartItemsQuantity()
    })
  }

  onShowDropdownMenu(){
    this.showDropdownMenu = !this.showDropdownMenu 
  }

  ngOnDestroy(){
    this.destroySubscription.next(true)
    this.destroySubscription.complete()
  }
}
