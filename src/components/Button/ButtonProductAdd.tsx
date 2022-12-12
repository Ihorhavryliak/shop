


import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'
type ButtonProductAddType = {
  kind?: string
}

export const ButtonProductAdd = React.memo(({kind}: ButtonProductAddType) => {
  return (
<>
    {kind === 'added' ? 
     <button type="button" className="btn btn-dark">
     <FiShoppingBag className="me-2" />  Added
   </button>
    :
    
    <button type="button" className="btn btn-dark">
    <FiShoppingBag className="me-2" />  Add to cart
  </button>
    }
   </>
  )
})
