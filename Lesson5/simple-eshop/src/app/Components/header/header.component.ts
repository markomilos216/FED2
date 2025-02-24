import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showDropdownMenu: boolean = false

  onShowDropdownMenu(){
    this.showDropdownMenu = !this.showDropdownMenu 
  }
}
