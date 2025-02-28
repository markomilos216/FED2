import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';
import { ProductService } from '../../Services/product.service';
import { FirestoreService } from '../../Services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
 
  products$!: Observable<any[]>;
  constructor(private firestoreService: FirestoreService) {}
  
  ngOnInit() {
    this.fetchProduct()
    //this.products$ = this.firestoreService.getProductsByCategory('mens-clothing');
  }

  fetchProduct(){
    this.products$ = this.firestoreService.getProducts();
  }

  updateProduct(id: string, data: any) {
    this.firestoreService.updateProduct(id, data);
  }

  deleteProduct(id: string) {
    this.firestoreService.deleteProduct(id);
  }
}
