import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { NavBreadcrumb, WrapperPopular } from "../components";
import {
  dataProduct,
  setCleanProduct,
  setDateReceiveProduct,
} from "../reducers/product-reducer/product-reducer";
import {
  getIsDateReceiveProductSelector,
  getProductInformation,
} from "../reducers/product-reducer/product-selector";
import { AppDispatch } from "../reducers/redux-store";
import { StarsUnderCard } from "../components/Products/StarsUnderCard/StarsUnderCard";
import { ProductCount } from "../components/Product/ProductCount/ProductCount";
import { ProductButtons } from "../components/Button/ProductButtons/ProductButtons";
import { ProductDescription } from "../components/Product/ProductDescription/ProductDescription";
import { ProductShare } from "../components/Product/ProductShare/ProductShare";
import { ProductCharacteristics } from "../components/Product/ProductCharacteristics/ProductCharacteristics";
import { ProductImg } from "../components/Product/ProductImg/ProductImg";
import { setProductCart } from "../reducers/cart-reducer/cart-reducer";
import { ProductCartType } from "../admin/api/cart-api";
import { motion } from "framer-motion";
import { ProductAnimation } from "../components/Product";

export const Product = React.memo(() => {
  const productNumber = useParams();
  const dispatch: AppDispatch = useDispatch();
  const productData = useSelector(getProductInformation);
  const location = useLocation();
  //Count
  const [value, setValue] = useState(1);
  //check is download date
  const getIsDateReceive = useSelector(getIsDateReceiveProductSelector);
  //set isDateReceive
  useEffect(() => {
    dispatch(setDateReceiveProduct(true));
  }, [location.pathname]);
  //the first request
  useEffect(() => {
    if (productNumber.id !== undefined) {
      const isSameId = productData.some(
        (m) => m.id === Number(productNumber.id)
      );
      if (!isSameId) {
        dispatch(dataProduct(+productNumber.id));
      }
    }
    return () => {
      dispatch(setCleanProduct());
    };
  }, [location]);
  //filter only include product from id
  const productDataFiltered = productData.filter((m) => {
    if (
      m !== undefined &&
      productNumber.id !== undefined &&
      m.id === +productNumber.id
    ) {
      return [m];
    } else {
      return null;
    }
  });
  //
  const addToCart = (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => {
    dispatch(setProductCart(userId, date, products));
  };

  return (
    <>
      <NavBreadcrumb />
      {getIsDateReceive ? (
        <ProductAnimation />
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          /* transition={{ duration: 1 }} */
          className="mt-8"
        >
          <div className="container">
            {productData.length > 0 &&
              productData
                .filter((m) => {
                  if (
                    m !== undefined &&
                    productNumber.id !== undefined &&
                    m.id === +productNumber.id
                  ) {
                    return [m];
                  } else {
                    return null;
                  }
                })
                .map((m) => {
                  document.title = m.title;
                  return (
                    <div className="row" key={m.id}>
                      <ProductImg m={m} />
                      <div className="col-md-6">
                        <div className="ps-lg-10 mt-6 mt-md-0">
                          <Link
                            className="mb-4 d-block"
                            to={`/products/category/${m.category.replace(
                              " ",
                              "-"
                            )}`}
                          >
                            {m.category[0].toUpperCase() + m.category.slice(1)}
                          </Link>
                          {/* h1 */}
                          <h1 className="mb-1"> {m.title}</h1>
                          <div className="mb-4">
                            <StarsUnderCard
                              rating={m.rating.rate}
                              countRating={m.rating.count}
                              type={"product"}
                            />
                          </div>
                          {/* price */}
                          <div className="fs-4">
                            <span className="text-dark">${m.price}</span>
                          </div>
                        </div>
                        <hr className="my-6" />
                        {/*  count */}
                        <ProductCount value={value} setValue={setValue} />
                        <ProductButtons
                          id={m.id}
                          addToCart={addToCart}
                          kind={"mainProduct"}
                          quantity={value}
                        />
                        <hr className="my-6" />
                        <ProductCharacteristics product={productDataFiltered} />
                        <ProductShare />
                      </div>
                    </div>
                  );
                })}
          </div>
          <ProductDescription data={productData} />
          <WrapperPopular title={"Related Items"} />
        </motion.section>
      )}
    </>
  );
});
