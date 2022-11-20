import React from 'react'
import { instance } from '../../api/api'


export const addProductAPI = {
  addProductRequest (id: number,title: string, price: number, description: string, image: string, category: string) {
   return (
        instance.put(`products/${id}`, {title, price, description, image, category}).then(res=> res.data)
    )
  }
}
