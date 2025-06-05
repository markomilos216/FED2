import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData, query, where } from '@angular/fire/firestore';
import { collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private productsCollection: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore, private snackBarService: SnackBarService) {
    this.productsCollection = collection(this.firestore, 'products');
}

  addProduct(product: any): Promise<void> {
    return addDoc(this.productsCollection, product)
    .then(() =>  this.snackBarService.showSnackBar('Product added successfully', 'success'))
    .catch(() => this.snackBarService.showSnackBar('Product not added', 'error'));
  }

  getProducts(): Observable<any[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  updateProduct(id: string, data: any): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return updateDoc(productDocRef, data)
    .then(() => this.snackBarService.showSnackBar('Product updated successfully', 'success'))
    .catch(() => this.snackBarService.showSnackBar('Product not updated', 'error'));
  }

  deleteProduct(id: string): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDocRef)
    .then(() => this.snackBarService.showSnackBar('Product deleted successfully', 'success'))
    .catch((error) => this.snackBarService.showSnackBar('Product not deleted', 'error'));
  }

  getProductsByCategory(categoryId: string): Observable<any[]> {
    const q = query(
      this.productsCollection,
      where('categoryId', '==', categoryId)
    );
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

}
