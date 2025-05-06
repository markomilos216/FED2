import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-delivery-address-form',
  templateUrl: './delivery-address-form.component.html',
  styleUrl: './delivery-address-form.component.css'
})
export class DeliveryAddressFormComponent {
  isEditMode: boolean = false
  addressId!: number
  addresses: any[] = []
  deliveryAddressForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(\\+?[0-9]{1,3})?[0-9]{9,15}$')]),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^\\d{3}\\s?\\d{2}$')]),
    state: new FormControl('', Validators.required)
  })
  
  constructor(private authService: AuthService, private route: ActivatedRoute){}

  ngOnInit(){
    this.authService.getUser().subscribe(user => {
      if (user?.addresses) {
        this.addresses = user.addresses
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.addressId = +id;
        this.loadAddressData(this.addressId);
      }
    })
  }

  loadAddressData(addressId: number){
    const address = this.addresses.find(addr => addr.id === addressId);
    if (address) {
      this.deliveryAddressForm.setValue({
        name: address.name,
        surname: address.surname,
        email: address.email,
        phone: address.phone,
        city: address.city,
        street: address.street,
        postalCode: address.postalCode,
        state: address.state
      });
    }
  }
  
  onSubmitDeliveryAddressForm(){
    if(this.isEditMode){
      this.authService.updateAddress(this.addressId, this.deliveryAddressForm.value)
    }else{
      this.authService.addAddress(this.deliveryAddressForm)
    }
  }
}
