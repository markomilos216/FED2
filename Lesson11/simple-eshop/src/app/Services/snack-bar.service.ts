import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  
  snackBarMessages = new BehaviorSubject<any[]>([])
  messages = this.snackBarMessages.asObservable()
  
  constructor() { }

  showSnackBar(message: string) {
    const newToast = {
      id: new Date().getTime(),
      message: message
    };

    const currentMessages = this.snackBarMessages.value;
    this.snackBarMessages.next([...currentMessages, newToast]);

    setTimeout(() => {
      this.removeSnackBar(newToast.id);
    }, 3000);
  }

  removeSnackBar(id: number) {
    const updatedMessages = this.snackBarMessages.value.filter(msg => msg.id !== id);
    this.snackBarMessages.next(updatedMessages);
  }
}
