import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.getTestData().subscribe(response => {
      console.log('Test data:', response);
    });
  }
}
