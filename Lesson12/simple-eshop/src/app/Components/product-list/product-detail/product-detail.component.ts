import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Models/Product';
import { ActivatedRoute, Router, } from '@angular/router';
import { FirestoreService } from '../../../Services/firestore.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CartService } from '../../../Services/cart.service';
import { SnackBarService } from '../../../Services/snack-bar.service';
import { CartItem } from '../../../Models/CartItem';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  constructor( 
    private router: Router, 
    private activeRoute: ActivatedRoute, 
    private firestoreService: FirestoreService, 
    private cartService: CartService,
    private snackBarService: SnackBarService){}

  selectedProduct!: Product | null;
  productId!: string
  setNumberOfItems: number = 1
  private unsubscribe$ = new Subject<void>();

  ngOnInit(){
    this.activeRoute.paramMap.pipe(
      switchMap((params) => {
        this.productId = params.get('id') || '';
        if (!this.productId) {
          return [];
        }
        return this.firestoreService.getProducts();
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe((products) => {
      this.selectedProduct = products.find((product) => product.id === this.productId) || null;
      if (!this.selectedProduct) {
        this.router.navigate(['/products']);
      }
    });
  }

  addProductToCart(){
    let cartItem = new CartItem(
      this.selectedProduct!.id,
      this.selectedProduct!.name,
      this.selectedProduct!.imageUrl,
      this.selectedProduct!.price,
      this.setNumberOfItems, 
      this.selectedProduct!.stock
    );
    this.cartService.addItemToCart(cartItem)
    this.snackBarService.showSnackBar('Added to cart')
  }

  decreaseNumberOfItems(){
    if(this.setNumberOfItems > 1){
      this.setNumberOfItems--
    }
  }

  increaseNumberOfItems(){
    if(this.setNumberOfItems < this.selectedProduct!.stock){
      this.setNumberOfItems++
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
