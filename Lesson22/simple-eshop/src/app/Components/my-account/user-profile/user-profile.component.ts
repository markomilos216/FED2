import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../Models/User';
import { Subscription } from 'rxjs';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  constructor(private authService: AuthService){}
  user!: User | null
  userSubscription!: Subscription;
  ngOnInit(){
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
