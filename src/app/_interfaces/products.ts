export type ProductType = {
    id : string,
    title : string,
    imageCover : string,
    price : number,
    quantity : number,
    ratingsAverage : number,
    description : string,
    priceAfterDiscount?: number
    images?: string[] 
}

export type CategoryType = {
    image : string,
    name : string,
    slug : string,
    _id : string
}

export type BrandType = {
    image : string,
    name : string,
    slug : string,
    _id : string
}