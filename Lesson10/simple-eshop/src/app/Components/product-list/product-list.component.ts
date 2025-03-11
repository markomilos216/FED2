import { Component, OnInit} from '@angular/core';
import { FirestoreService } from '../../Services/firestore.service';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { Product } from '../../Models/Product';
import { CartService } from '../../Services/cart.service';
import { SnackBarService } from '../../Services/snack-bar.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
 
  searchInput$ = new BehaviorSubject<string>('');
  selectedCategory$ = new BehaviorSubject<string>('all'); 
  priceRange$ = new BehaviorSubject<{ min: number; max: number }>({ min: 0, max: 99999 });
  products$!: Observable<any[]>;
  
  selectedCategory: string = '';
  showHideFilters: boolean = false;
  searchInput: string = '';
  constructor(private firestoreService: FirestoreService, private cartService: CartService, private snackBarService: SnackBarService) {}
  
  ngOnInit() {
    this.setupProductFiltering()
  }

  toggleFilterOptions(){
    this.showHideFilters = !this.showHideFilters
  }

  setupProductFiltering(){
    this.products$ = combineLatest([
      this.firestoreService.getProducts(),
      this.searchInput$,
      this.selectedCategory$,
      this.priceRange$
    ]).pipe(
      map(([products, searchTerm, category, priceRange]) => 
        products.filter(product =>
          product.name.toLowerCase().includes(searchTerm) &&
          (category === 'all' || product.categoryId === category) &&
          product.price >= priceRange.min && product.price <= priceRange.max
        )
      )
    )
  }

  searchProduct() {
    this.searchInput$.next(this.searchInput);
  }

  filerProductsByPrice(minPrice: string | '', maxPrice: string | ''){
    const min = minPrice ? Math.abs(+minPrice) : 0;
    const max = maxPrice ? Math.abs(+maxPrice) : 99999;
    this.priceRange$.next({ min, max });
  }

  onCategoryChange(){
    this.selectedCategory$.next(this.selectedCategory);
  }

  updateProduct(id: string, data: any) {
    this.firestoreService.updateProduct(id, data);
  }

  deleteProduct(id: string) {
    this.firestoreService.deleteProduct(id);
  }

  addProductToCart(product: Product){
    let cartItem = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1
    }
    this.cartService.addItemToCart(cartItem)
    this.snackBarService.showSnackBar('Added to cart')
  }
}
