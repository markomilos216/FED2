import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent implements OnInit{
  isAdmin!: boolean
  constructor(private authService: AuthService){}

 ngOnInit(){
  this.authService.user.subscribe(user => {
    this.isAdmin = user?.role === 'admin' ? true : false    
  })
 }
}
