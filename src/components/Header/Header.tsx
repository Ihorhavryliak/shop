import React from "react";
import { BsCart4 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../../assets/shop-logo.png";
import './Header.scss';
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser, BiSearch } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
const Header = React.memo(() => {
  return (
    <header >
      <div className="navbar navbar-light py-lg-4 pt-3 px-0 pb-0">
      <div className="container">
      <div className="row w-100 align-items-center g-lg-2 g-0">
        <div className=" col-3 "><NavLink to='/'> 
        <span className="logo"><BsCart4 className="logo__icon" />  ShopStore  </span></NavLink></div>
        <div className="col-6">
          <form action="">
            <div className="input-group rounded-3">
              <input
                type="search"
                className="form-control  "
                placeholder="Recipient's username "
                aria-label="Recipient's username"
                aria-describedby="inputGroup-sizing-sm"
              />
      
                <button
                  className="input-group-text "
                  type="button"
                >
             <BiSearch />
                </button>
       
            </div>
          </form>
        </div>
        <div className="col-3 text-end fs-4 list-inline-item">
          <a className="text-muted position-relative pe-2" href="s"><AiOutlineHeart /></a>
          <a className="text-muted position-relative pe-2" href="s"><BiUser/> </a>
          <a className="text-muted position-relative" href="s"><FiShoppingBag /></a>  </div>
      </div>
      </div>
      </div>
    </header>
  );
});

export default Header;
