import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../Models/Product';
import { FirestoreService } from '../../../Services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit, OnDestroy{
  products: Product[] = []
  productSub!: Subscription
  productId!: string
  @ViewChild('modalDialog') deleteModalDialog!: ElementRef<HTMLDialogElement>
  
  constructor(private firestoreService: FirestoreService, private router: Router){}

  ngOnInit() {
    this.productSub = this.firestoreService.getProducts().subscribe(product => {
      this.products = product      
    })
  }
  
  onUpdateProduct(productId: string){
    this.router.navigate(['/my-account/product-management-form', productId])
  }

  openDeleteDialog(productId: string){
    this.productId = productId
    this.deleteModalDialog.nativeElement.showModal()
  }

  onDeleteProduct(){
    if(this.productId){
      this.firestoreService.deleteProduct(this.productId)
      this.deleteModalDialog.nativeElement.close()
    }
  }

  onCloseDialog(){
    this.deleteModalDialog.nativeElement.close()
  }

  ngOnDestroy() {
    this.productSub.unsubscribe()
  }
}
