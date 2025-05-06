import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrl: './delivery-address.component.css'
})
export class DeliveryAddressComponent implements OnInit, OnDestroy{
  addresses: any[] = []
  currentAddressId: number | null = null
  @ViewChild('modalDialog') deleteModalDialog!: ElementRef<HTMLDialogElement>
  userSub!: Subscription
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this. userSub = this.authService.getUser().subscribe(user => {
      if(user?.addresses){
        this.addresses = user.addresses
      }
    }) 
  }

  openDeleteDialog(addressId: number){
    this.currentAddressId = addressId
    this.deleteModalDialog.nativeElement.showModal()
  }

  onDeleteAddress(){
    if(this.currentAddressId){
      this.authService.deleteAddress(this.currentAddressId)
      this.deleteModalDialog.nativeElement.close()
    }
  }

  closeDialog(){
    this.deleteModalDialog.nativeElement.close()
  }

  onEditAddress(addressId: Date){
    this.router.navigate(['/my-account/delivery-address-form', addressId])
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
