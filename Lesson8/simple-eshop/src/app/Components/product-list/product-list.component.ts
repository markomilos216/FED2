import { Component, OnInit} from '@angular/core';
import { FirestoreService } from '../../Services/firestore.service';
import { map, Observable, of, filter } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
 
  products$!: Observable<any[]>;
  selectedCategory: string = '';
  showHideFilters: boolean = false;
  minPriceValue: number = 0;
  maxPriceValue: number = 99999;
  constructor(private firestoreService: FirestoreService) {}
  
  ngOnInit() {
    this.fetchProduct()
  }

  toggleFilterOptions(){
    this.showHideFilters = !this.showHideFilters
  }

  filerProductsByPrice(minPrice: string | '', maxPrice: string | ''){
    let minPriceValue = minPrice ? +minPrice : this.minPriceValue; 
    let maxPriceValue = maxPrice ? +maxPrice : this.maxPriceValue;

    if(minPriceValue < 0 ){
      minPriceValue = Math.abs(minPriceValue)
    }
    if(maxPriceValue < 0){
      maxPriceValue = Math.abs(maxPriceValue)
    }

    this.products$ = this.firestoreService.getProducts().pipe(
      map((products) =>
        products.filter((product) => product.price >= minPriceValue && product.price <= maxPriceValue)
      )
    );
  }

  fetchProduct(){
    this.products$ = this.firestoreService.getProducts()
  }

  onCategoryChange(){
    if(this.selectedCategory === 'all'){
      this.fetchProduct()
    }else{
      this.products$ = this.firestoreService.getProductsByCategory(this.selectedCategory)
    }
  }

  updateProduct(id: string, data: any) {
    this.firestoreService.updateProduct(id, data);
  }

  deleteProduct(id: string) {
    this.firestoreService.deleteProduct(id);
  }
}
