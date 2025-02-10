import { Component } from '@angular/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any = [
    {
      id: 1,
      productName: 'T-shirt',
      description: 'This is simple description text for testing purposes.',
      price: 25,
      category: 't-shirt',
      img: ''
    },
    {
      id: 1,
      productName: 'T-shirt',
      description: 'This is simple description text for testing purposes.',
      price: 25,
      category: 't-shirt',
      img: ''
    },
    {
      id: 1,
      productName: 'T-shirt',
      description: 'This is simple description text for testing purposes.',
      price: 25,
      category: 't-shirt',
      img: ''
    },
    {
      id: 1,
      productName: 'T-shirt',
      description: 'This is simple description text for testing purposes.',
      price: 25,
      category: 't-shirt',
      img: ''
    },
    {
      id: 1,
      productName: 'T-shirt',
      description: 'This is simple description text for testing purposes.',
      price: 25,
      category: 't-shirt',
      img: ''
    },
    {
      id: 1,
      productName: 'T-shirt',
      description: 'This is simple description text for testing purposes.',
      price: 25,
      category: 't-shirt',
      img: ''
    }
  ]
}
