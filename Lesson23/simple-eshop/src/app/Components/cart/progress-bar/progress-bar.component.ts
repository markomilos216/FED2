import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarService } from '../../../Services/progress-bar.service';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit{
  currentStep: string = 'shipping'
  subState!: Subscription

  constructor(private progressBarService: ProgressBarService){}

  ngOnInit() {
    this.subState = this.progressBarService.step.subscribe(step => {
      this.currentStep = step
    })
  }
}
