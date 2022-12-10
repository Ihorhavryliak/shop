import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import './ProductButtons.scss'
import { FavoriteHeart } from "../../FavoriteHeart/FavoriteHeart";
import { ProductCartType } from "../../../admin/api/cart-api";
import { ButtonAddToCard } from "../ProductsButtons/ButtonAddToCard";

type ProductButtonsType = {
  addToCart: (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => void;
  id: number
  kind?: string
  quantity?: number
}  
export const ProductButtons = React.memo(({id = 1, kind, addToCart, quantity}: ProductButtonsType) => {
 /*  const getFavoriteData = useSelector(getFavoriteSelector);
  const dispatch = useDispatch(); */
  return (<>
    {kind ==='category' ?  
    <div className="fs-5">

  <ButtonAddToCard kind={kind} id={id} addToCart={addToCart} quantity={quantity} />
  </div> 
    :
    
 
    <div className="mt-3 row justify-content-start g-2 align-items-center">
      <div className="col-xxl-4 col-lg-4 col-md-5 col-5 d-grid">
    
      <ButtonAddToCard kind={kind} id={id} addToCart={addToCart} quantity={quantity} />

       
      </div>
      <div className="col-md-4 col-4">
      <span
          className="btn btn-light me-1"
          /* to="/" */
          data-bs-toggle="tooltip"
          data-bs-html="true"
          aria-label="Compare"
        > 
       
          <BsArrowLeftRight className="feather-icon" />
        </span> 
        <FavoriteHeart id={id}  className="btn btn-light " />
       
      </div>
    </div>
      }</>
  );
});
