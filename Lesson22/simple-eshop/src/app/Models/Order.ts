import { Basket } from "./Basket";

export interface Order{
    createdAt: Date,
    id: string,
    deliveryAddress: {
        city: string,
        email: string,
        name: string,
        surname: string,
        personalDataAgreement: boolean,
        phone: number,
        postalCode: string,
        rememberMe: boolean,
        state: string,
        street: string
    },
    items: Basket[],
    shipping: {
        payment: string,
        shipping: string
    },
    status: string,
    totalPrice: number
}