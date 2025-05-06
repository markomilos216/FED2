import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../Models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent implements OnInit, OnDestroy{
  isAdmin!: boolean
  user!: User | null
  userSubscription!: Subscription;
  constructor(private authService: AuthService){}

 ngOnInit(){
  this.authService.user.subscribe(user => {
    this.isAdmin = user?.role === 'admin' ? true : false    
  })

  this.userSubscription = this.authService.getUser().subscribe(user => {
    this.user = user     
  })
 }

 ngOnDestroy() {
  if (this.userSubscription) {
    this.userSubscription.unsubscribe();
  }
}
}
