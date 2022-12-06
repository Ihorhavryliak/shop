import React from "react";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ProductCartType } from "../../../admin/api/cart-api";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { getCartProductsSelector } from "../../../reducers/cart-reducer/cart-selector";
import { ButtonProductAdd } from "../ButtonProductAdd";
import { FiShoppingBag } from "react-icons/fi";

type ButtonAddToCardType = {
  addToCart: (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => void;
  id: number;
  kind?: string;
  quantity?: number
};

export const ButtonAddToCard = React.memo((props: ButtonAddToCardType) => {
  const cartDate = useSelector(getCartProductsSelector);
  const { addToCart, id, kind, quantity = 1 } = props;
  return (
    <button
      onClick={() =>
        addToCart(id, getCurrentDate("-"), [{ productId: id, quantity: quantity }])
      }
      className={`${
        kind === "mainProduct" ? "btn btn-dark" : "btn btn-dark  btn-sm "
      }   `}
    >
      {cartDate.some((m) => m.productId === id) ? (
        <>
          {kind === "mainProduct" ? (
            <>
              <FiShoppingBag className="me-2" /> Added
            </>
          ) : (
            <>
              <BsPlus size={22} />
              <span>Added</span>
            </>
          )}
        </>
      ) : (
        <>
          {kind === "mainProduct" ? (
            <>
              <FiShoppingBag className="me-2" /> Add to cart
            </>
          ) : (
            <>
              {" "}
              <BsPlus size={22} />
              <span>Add</span>
            </>
          )}{" "}
        </>
      )}
    </button>
  );
});
