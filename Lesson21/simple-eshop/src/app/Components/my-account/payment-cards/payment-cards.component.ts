import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cards',
  templateUrl: './payment-cards.component.html',
  styleUrl: './payment-cards.component.css'
})
export class PaymentCardsComponent implements OnInit, OnDestroy{
  paymentCards: any[] = []
  currentCardId: number | null = null
  @ViewChild('modalDialog') deleteModalDialog!: ElementRef<HTMLDialogElement>
  userSub!: Subscription

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.userSub = this.authService.getUser().subscribe(user => {
      if(user?.paymentCards){
        this.paymentCards = user.paymentCards
      }
    })
  }

  openDeleteDialog(cardId: number){
    this.currentCardId = cardId
    this.deleteModalDialog.nativeElement.showModal()
  }

  onDeleteCard(){
    if(this.currentCardId){
      this.authService.deleteCard(this.currentCardId)
      this.deleteModalDialog.nativeElement.close()
    }
  }

  onCloseDialog(){
    this.deleteModalDialog.nativeElement.close()
  }

  onEditAddress(cardId: number){
    this.router.navigate(['/my-account/payment-cards-form', cardId])
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
