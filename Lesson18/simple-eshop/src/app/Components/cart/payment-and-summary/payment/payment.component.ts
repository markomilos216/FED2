import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../Services/auth.service';
import { expirationDateGroupValidator } from '../../../../Validators/card-expire.validator';
import { fullNameValidator } from '../../../../Validators/card-full-name.validator';
import { cardNumberValidator } from '../../../../Validators/card-number.validator';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit, OnDestroy{
  allCards: any[] = []
  filteredCards: any[] = []
  showDropdown: boolean = false
  isLoggedIn!: boolean
  userSub!: Subscription
  paymentForm:FormGroup = new FormGroup({
    fullName: new FormControl('', fullNameValidator()),
    cardNumber: new FormControl('', [Validators.required, cardNumberValidator()]),
    month: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]),
    year: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}$/)]),
    ccv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)]),
    rememberMe: new FormControl(false)
  },{
    validators: expirationDateGroupValidator()
  })

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userSub = this.authService.getUser().subscribe(user => {
      if(user && user.paymentCards){
        this.allCards = user.paymentCards
      }
    })
    this.cardNumberFormatter()
    this.isLoggedIn = this.authService.authUser
  }

  onInput(event: Event){
    const input = (event.target as HTMLInputElement).value.toLowerCase()
    this.filteredCards = this.allCards.filter(card => {
      return card.name.toLowerCase().includes(input) || card.surname.toLowerCase().includes(input)
    })
    this.showDropdown = true
  }

  selectedCard(card: any){
    this.paymentForm.patchValue({
      fullName: card.name + ' ' + card.surname,
      cardNumber: card.cardNumber,
      month: card.expirationDate.slice(0,2),
      year: card.expirationDate.slice(-2),
      ccv: card.ccv
    })
    this.showDropdown = false
  }

  cardNumberFormatter(){
    const cardNumberControl = this.paymentForm.get('cardNumber');
    if (cardNumberControl) {
      cardNumberControl.valueChanges.subscribe(value => {
        if (value !== null && value !== undefined) {
          let cleaned = value.replace(/\D+/g, '');

          if (cleaned.length > 16) {
            cleaned = cleaned.substring(0, 16);
          }

          const formatted = cleaned.match(/.{1,4}/g)?.join(' ') ?? '';

          if (value !== formatted) {
            cardNumberControl.setValue(formatted, { emitEvent: false });
          }
        }
      });
    }
  }

  onProceed(){
    if(this.paymentForm.invalid){
      this.paymentForm.markAllAsTouched()
      return
    }
    if(this.paymentForm.get('rememberMe')?.value){
      this.authService.addCard(this.paymentForm, true)
    }
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
