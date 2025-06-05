export class Product{
    constructor(
        public readonly id: string, 
        public categoryId: string,
        public createdAt: Date,
        public description: string,
        public name: string,
        public imageUrl: string,
        public price: number,
        public stock: number
    ){}
}