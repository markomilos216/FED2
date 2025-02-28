import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // allProducts: Product[] = [
  //   {
  //     id: 1,
  //     productName: 'T-shirt 1',
  //     description: 'This is simple description text for testing purposes.',
  //     price: 25,
  //     category: 't-shirt',
  //     img: ''
  //   },
  //   {
  //     id: 2,
  //     productName: 'T-shirt 2',
  //     description: 'This is simple description text for testing purposes.',
  //     price: 25,
  //     category: 't-shirt',
  //     img: ''
  //   },
  //   {
  //     id: 3,
  //     productName: 'T-shirt 3',
  //     description: 'This is simple description text for testing purposes.',
  //     price: 25,
  //     category: 't-shirt',
  //     img: ''
  //   },
  //   {
  //     id: 4,
  //     productName: 'T-shirt 4',
  //     description: 'This is simple description text for testing purposes.',
  //     price: 25,
  //     category: 't-shirt',
  //     img: ''
  //   },
  //   {
  //     id: 5,
  //     productName: 'T-shirt 5',
  //     description: 'This is simple description text for testing purposes.',
  //     price: 25,
  //     category: 't-shirt',
  //     img: ''
  //   },
  //   {
  //     id: 6,
  //     productName: 'T-shirt 6',
  //     description: 'This is simple description text for testing purposes.',
  //     price: 25,
  //     category: 't-shirt',
  //     img: ''
  //   }
  // ]
}
