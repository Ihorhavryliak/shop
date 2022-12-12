import { instance } from "../../api/api"


export const cartAPI = {
  addProductToCart (userId: number, date: string, products: ProductCartType[]) {
   return (
        instance.post<addProductToCartType>(`carts`, {userId, date, products}).then(res=> res.data)
    )
  }
}

export type addProductToCartType = {
  id:number,
  userId:number,
  date: number,
  products: Array<ProductCartType>
}

export type ProductCartType = {
 productId:number,
 quantity:number
}