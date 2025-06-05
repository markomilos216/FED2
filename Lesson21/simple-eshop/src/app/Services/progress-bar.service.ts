import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private stepSubject = new BehaviorSubject<string>('shipping')
  step = this.stepSubject.asObservable()
  constructor() { }

  setStep(step: string){
    this.stepSubject.next(step)
  } 

  get currentStep(){
    return this.stepSubject.value
  }
}
