import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../../Services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../../Models/Product';

@Component({
  selector: 'app-product-management-form',
  templateUrl: './product-management-form.component.html',
  styleUrl: './product-management-form.component.css'
})
export class ProductManagementFormComponent implements OnInit, OnDestroy{
  isEditMode: boolean = false
  productSub!: Subscription
  productId!: string
  products: Product[] = []
  productManagementForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    stock: new FormControl(null, Validators.required)
  })

  constructor(private firestoreService: FirestoreService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.productSub = this.firestoreService.getProducts().subscribe(product => {
      if(product){
        this.products = product
      }
      this.route.paramMap.subscribe(params => {
        const id = params.get('id')
        if(id){
          this.isEditMode = true
          this.productId = id
          this.loadProductData(id)
        }
      })
    }) 
  }

  onSubmit(){
    if(this.isEditMode){
      this.firestoreService.updateProduct(this.productId, this.productManagementForm.value)
    }else{
      this.firestoreService.addProduct(this.productManagementForm.value)
    }
    setTimeout(() => {
      this.router.navigate(['/my-account/product-management'])
    },1000)
  }

  loadProductData(productId: string){
    const product = this.products.find(product => product.id === productId)
    if(product){
      this.productManagementForm.setValue({
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl,
        price: product.price,
        stock: product.stock
      })
    }
  }

  ngOnDestroy() {
    this.productSub.unsubscribe()
  }
}
