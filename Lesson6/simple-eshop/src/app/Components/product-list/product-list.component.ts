import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
  constructor(private productService: ProductService){}
  products: Product[] = []
  
  ngOnInit(){
    this.products = this.productService.allProducts
  }
}
