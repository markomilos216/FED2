import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/User';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  users: User[] = [];
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.getAllUsers().subscribe(users => {
      this.users = users
    })    
  }
}
