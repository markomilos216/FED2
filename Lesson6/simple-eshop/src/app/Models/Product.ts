export class Product{

    constructor(id: number, productName: string, description: string, price: number, category: string, img: string){
        this.id = id
        this.productName = productName
        this.description = description
        this.price = price
        this.category = category
        this.img = img
    }
    id: number
    productName: string
    description: string
    price: number
    category: string
    img: string
}