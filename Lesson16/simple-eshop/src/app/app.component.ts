import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackBarService } from './Services/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  
  snackBarMessages: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.subscription = this.snackBarService.messages.subscribe(messages => {
      this.snackBarMessages = messages;
    });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}
