import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showDropdownMenu: boolean = false

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.showDropdownMenu = false;
      }
    })
  }

  onShowDropdownMenu(){
    this.showDropdownMenu = !this.showDropdownMenu 
  }
}
