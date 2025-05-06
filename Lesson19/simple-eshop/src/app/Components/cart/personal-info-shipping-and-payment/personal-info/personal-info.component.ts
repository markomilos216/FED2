import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit, OnDestroy{
  submitted!:boolean
  allAddresses: any[] = []
  filteredAddresses: any[] = []
  showDropdown: boolean = false
  isLoggedIn!: boolean
  userSub!: Subscription
  storageAddressData!: {}
  shippingAddressForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(\\+?[0-9]{1,3})?[0-9]{9,15}$')]),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}\\s?\\d{2}$')]),
    state: new FormControl('', Validators.required),
    personalDataAgreement: new FormControl(false, Validators.requiredTrue),
    rememberMe: new FormControl(false)
  })

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userSub = this.authService.getUser().subscribe(user => {
      if(user && user.addresses){
        this.allAddresses = user.addresses
      }
    })
    this.isLoggedIn = this.authService.authUser
    this.storageAddressData = JSON.parse(localStorage.getItem('deliveryAddress') || '[]')
    if(this.storageAddressData){
      this.selectAddress(this.storageAddressData)
    }
    
  }

  onInput(event: Event){
    const input = (event.target as HTMLInputElement).value.toLowerCase()
    this.filteredAddresses = this.allAddresses.filter(adress => {
      return adress.name.toLowerCase().includes(input)
    })
    this.showDropdown = true
  }

  selectAddress(address: any) {
    this.shippingAddressForm.patchValue({
      name: address.name,
      surname: address.surname,
      email: address.email,
      phone: address.phone,
      city: address.city,
      street: address.street,
      postalCode: address.postalCode,
      state: address.state,
    });
    this.showDropdown = false
  }

  onSubmit(){
    this.submitted = true;
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
