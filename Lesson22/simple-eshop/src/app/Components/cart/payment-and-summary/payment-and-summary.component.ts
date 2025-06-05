import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '../../../Services/progress-bar.service';

@Component({
  selector: 'app-payment-and-summary',
  templateUrl: './payment-and-summary.component.html',
  styleUrl: './payment-and-summary.component.css'
})
export class PaymentAndSummaryComponent implements OnInit{
  
  constructor(private progressBarService: ProgressBarService){}
  
  ngOnInit(){
    this.progressBarService.setStep('payment')
  }
}
