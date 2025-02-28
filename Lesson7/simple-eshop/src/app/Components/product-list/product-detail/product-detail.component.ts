
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Models/Product';
import { ActivatedRoute, Router, } from '@angular/router';
import { FirestoreService } from '../../../Services/firestore.service';
import { Subject, switchMap, takeUntil } from 'rxjs';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  constructor( private router: Router, private activeRoute: ActivatedRoute, private firestoreService: FirestoreService){}

  selectedProduct!: Product | null;
  productId!: string
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
        console.error('Product not found!');
        this.router.navigate(['/products']);
      }
    });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
