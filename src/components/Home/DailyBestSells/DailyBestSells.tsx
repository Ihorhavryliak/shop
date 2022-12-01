import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInCategory } from "../../../reducers/products-list-reducer/products-list-reducer";
import { getAllProducts } from "../../../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../../../reducers/redux-store";
import { CartProduct } from "../../Products";
import './DailyBestSells.scss';
import imgBestsellers from '../../../assets/bestsellers.jpg'
import { CartProductCard } from "./CartProductCard/CartProductCard";
import { ButtonShopNow } from "../../Button/ButtonShopNow";
const DailyBestSells = React.memo(() => {
  const products = useSelector(getAllProducts); 


  return (
    <section className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0 fw-bold">Daily Best Sells</h3>
          </div>
        </div>
        <div className="row row-cols-lg-4 row-cols-1 row-cols-md-2 g-4">
        <div className="col">
            <div className=" pt-8 px-6 px-xl-8 rounded-3" 
            style={{background:`url(${imgBestsellers})no-repeat`,  
            backgroundSize: 'cover', height: '470px'}}>
              <div>
                <h3 className="fw-bold text-white">100% Organic
                  Coffee Beans.
                </h3>
                <p className="text-white">Get the best deal before close.</p>
              <ButtonShopNow />
              </div>
            </div>
          </div>
          {products.filter(f =>{
            return(
                f.category === 'jewelery'
            )
          }).slice(1).map((m) => (
            <CartProductCard m={m} key={m.id} />
          ))}
        </div>
      </div>
    </section>
  );
});

export  default DailyBestSells