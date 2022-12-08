import React, { useState, useEffect } from "react";
import { BsCart4, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser, BiSearch } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { Search } from "../Inputs/Search";
import { getLocalStorage } from "../../utils/getLocalStorage";
import { getFavoriteSelector } from "../../reducers/products-list-reducer/products-list-selector";
import { useSelector } from "react-redux";
import { ModalLogin } from "../ModalLogin/ModalLogin";
import { OnModalProduct } from "../Products";
import { getIsAuthSelector } from "../../reducers/auth-reducer/auth-selector";
import { CartModal } from "../CartModal/CartModal";
import { getCartSelector } from "../../reducers/cart-reducer/cart-selector";
const Header = React.memo(() => {
  const getFavoriteData = useSelector(getFavoriteSelector);
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isLogIn = useSelector(getIsAuthSelector);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const cartDate = useSelector(getCartSelector);
  //close forme
  useEffect(() => {
    if (isLogIn !== null) {
      setTimeout(() => {
        setIsOpenModal(!isLogIn);
        if (isLogIn) {
          return navigate("/");
        }
      }, 600);
    }
  }, [isLogIn]);

  //
  if (isLogIn !== null) {
  }

  return ( <>
     <header className="is-sticky">
      <div className=" navbar navbar-light py-lg-3 pt-3 px-0 pb-3 d-flex justify-content-between ">
    
        <div className="container">
          <div className="row w-100 align-items-center g-lg-2 g-0">
            <div className=" col-8 	 col-sm-6 col-md-6 col-lg-3 col-xl-3   col-xxl-3  ">
              <NavLink to="/">
                <span className="logo">
                  <BsCart4 className="logo__icon" /> ShopStore{" "}
                </span>
              </NavLink>
            </div>
            <div className="col-6 	 col-sm-6 col-md-6 col-lg-6 col-xl-6   col-xxl-6 d-none d-lg-block">
              <Search />
            </div>
            <div className="col-4 	 col-sm-6 col-md-6 col-lg-3 col-xl-3   col-xxl-3  text-end fs-4 list-inline-item">
              <div className="list-inline">
                <div className="list-inline-item">
                  <NavLink
                    className="text-muted position-relative pe-2"
                    to="favorite"
                  >
                   {/*  {getFavoriteData.length > 0 ? (
                      <BsFillHeartFill />
                    ) : (
                     ''
                    )} */}
                      <BsHeart />
                    {getLocalStorage("favorite").length > 0 ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success small_size">
                        {getLocalStorage("favorite").length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </div>

                <div className="list-inline-item">
                  <span
                    className="text-muted position-relative pe-2 span__link"
                    onClick={() => {
                      setIsOpenModal(!isOpenModal);
                    }}
                  >
                    <BiUser />{" "}
                  </span>
                </div>
                <div className="list-inline-item">
                  <span
                    onClick={() => {
                      setIsOpenCart(!isOpenCart);
                    }}
                    className="text-muted position-relative span__link"
                  >
                    <FiShoppingBag />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success small_size">
                    {cartDate.products.length > 0 && cartDate.products.reduce((total, obj) => total + obj.quantity, 0)}
                    </span>
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>
        {/* cart */}
        <CartModal isOpenMenu={isOpenCart} setIsOpenMenu={setIsOpenCart}  />
    
      <OnModalProduct
        name={"Sing In"}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      >
        <ModalLogin setIsOpenModal={setIsOpenModal} />
      </OnModalProduct>
 

    
   </>
  );
});

export default Header;
