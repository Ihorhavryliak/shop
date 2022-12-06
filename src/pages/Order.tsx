import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartSelector } from '../reducers/cart-reducer/cart-selector';
import { getAllProducts } from '../reducers/products-list-reducer/products-list-selector';
import { AppDispatch } from '../reducers/redux-store';

export const Order = React.memo(() => {

  const cartDate = useSelector(getCartSelector);
  const getProducts = useSelector(getAllProducts);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='mb-2'>
            <h1>
              Order
            </h1>
            <p>There are 1 product in this order.</p>

          </div>

        </div>

      </div>
      Order</div>
  )
})
