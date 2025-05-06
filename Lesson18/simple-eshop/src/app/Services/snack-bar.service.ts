import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  
  snackBarMessages = new BehaviorSubject<any[]>([])
  messages = this.snackBarMessages.asObservable()
  
  constructor() { }

  showSnackBar(message: string, snackBarType: string) {
    let typeClass = 'info-msg';
    let iconClass = 'fa-info-circle';

    if(snackBarType === 'success'){
      typeClass = 'success-msg';
      iconClass = 'fa-circle-check';
    }else if(snackBarType === 'error'){
      typeClass = 'error-msg';
      iconClass = 'fa-circle-xmark';
    }

    const newSnackBar = {
      id: new Date().getTime(),
      message: message,
      typeClass: typeClass, 
      iconClass: iconClass 
    };  
    
    const currentMessages = this.snackBarMessages.value;
    this.snackBarMessages.next([...currentMessages, newSnackBar]);

    setTimeout(() => {
      const toastElement = document.querySelector(`[data-id="${newSnackBar.id}"]`);
      if (toastElement) {
        toastElement.classList.add(typeClass);

        const iconElement = toastElement.querySelector('i');
        if (iconElement) {
          iconElement.className = `fa-solid ${iconClass}`;
        }
      }
    }, 50);

    setTimeout(() => {
      this.removeSnackBar(newSnackBar.id);
    }, 3000);
  }

  removeSnackBar(id: number) {
    const updatedMessages = this.snackBarMessages.value.filter(msg => msg.id !== id);
    this.snackBarMessages.next(updatedMessages);
  }
}
