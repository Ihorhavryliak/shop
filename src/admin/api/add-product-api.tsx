import React from 'react'
import { instance } from '../../api/api'


export const addProductAPI = {
  addProductRequest (title: string, price: number, description: string, image: string, category: string, id =77) {
   return (
        instance.post(`products`, {id, title, price, description, image, category}).then(res=> res.data)
    )
  }
}
