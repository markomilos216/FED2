export class CartItem{
    constructor(
        public readonly id: string, 
        public name: string,
        public imageUrl: string,
        public price: number,
        public quantity: number,
        public stock: number
    ){}
}