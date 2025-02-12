import { ProductService } from './../../../Services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Models/Product';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  constructor(private productService: ProductService, private router: Router, private activeRoute: ActivatedRoute){}

  selectedProduct!: Product
  productId!: number
  paramMapObs: any

  ngOnInit(){
    this. paramMapObs = this.activeRoute.paramMap.subscribe((data) => {
      this.productId= Number(data.get('id'))
      const foundProduct = this.productService.allProducts.find(product => product.id === this.productId)
      
      if(foundProduct){
        this.selectedProduct = foundProduct
      }else{
        this.router.navigate(['/products'])
      }
    })
  }

  ngOnDestroy(){
    this.paramMapObs.unsubscribe()
  }

}