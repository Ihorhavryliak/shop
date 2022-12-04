


import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'

export const ButtonProductAdd = React.memo(() => {
  return (
    <button type="button" className="btn btn-dark">
          <FiShoppingBag className="me-2" />  Add to cart
        </button>
  )
})
