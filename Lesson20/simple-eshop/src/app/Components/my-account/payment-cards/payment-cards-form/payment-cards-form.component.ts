import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { expirationDateValidator } from '../../../../Validators/expiration-date.validator';

@Component({
  selector: 'app-payment-cards-form',
  templateUrl: './payment-cards-form.component.html',
  styleUrl: './payment-cards-form.component.css'
})
export class PaymentCardsFormComponent implements OnInit{
  isEditMode: boolean = false
  cardId!: number
  paymentCards: any[] = []
  paymentCardsForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
    expirationDate: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/), expirationDateValidator()]),
    ccv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)])
  })

  constructor(private authService: AuthService, private route: ActivatedRoute){}

  ngOnInit(){
    this.authService.getUser().subscribe(user => {
      if(user?.paymentCards){
        this.paymentCards = user.paymentCards
      }
    })

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id){
        this.isEditMode = true
        this.cardId = +id
        this.loadCardData(this.cardId)
      }
    })

    this.paymentCardsForm.get('cardNumber')?.valueChanges.subscribe(value => {
      if (value) {
        const cleaned = value.replace(/\s+/g, '');
        if (value !== cleaned) {
          this.paymentCardsForm.get('cardNumber')?.setValue(cleaned, { emitEvent: false });
        }
      }
    })
  }

  loadCardData(cardId: number){
    const card = this.paymentCards.find(card => card.id === cardId)
    if(card){
      this.paymentCardsForm.setValue({
        name: card.name,
        surname: card.surname,
        cardNumber: '',
        expirationDate: '',
        ccv: ''
      })
    }
  }

  onSubmitPaymentCardsForm(){
    if(this.isEditMode){
      this.authService.updateCard(this.cardId, this.paymentCardsForm.value)
    }else{
      this.authService.addCard(this.paymentCardsForm, false)
    }
  }
}
