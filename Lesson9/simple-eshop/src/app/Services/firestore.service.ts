import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData, query, where } from '@angular/fire/firestore';
import { collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private productsCollection: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'products');
}

  addProduct(product: any): Promise<void> {
    return addDoc(this.productsCollection, product)
    .then(() => console.log('Product added successfully!'))
    .catch((error) => console.error('Error adding product: ', error));
  }

  getProducts(): Observable<any[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  updateProduct(id: string, data: any): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return updateDoc(productDocRef, data)
    .then(() => console.log('Product updated successfully!'))
    .catch((error) => console.error('Error updating product: ', error));
  }

  deleteProduct(id: string): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDocRef)
    .then(() => console.log('Product deleted successfully!'))
    .catch((error) => console.error('Error deleting product: ', error));
  }

  getProductsByCategory(categoryId: string): Observable<any[]> {
    const q = query(
      this.productsCollection,
      where('categoryId', '==', categoryId)
    );
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

}
