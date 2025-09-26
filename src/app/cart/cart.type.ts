import { ProductType } from "../_interfaces/products"

export type CartItemType = {
    numOfCartItems : number,
    products : cartProductType[],
    totalCartPrice: number,
    cartId: string
}

export type cartProductType = {
    count : number,
    _id : string,
    price: number,
    product : ProductType
}