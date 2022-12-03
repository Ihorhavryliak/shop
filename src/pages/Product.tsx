import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { NavBreadcrumb } from "../components";
import { dataProduct } from "../reducers/product-reducer/product-reducer";
import { getProductInformation } from "../reducers/product-reducer/product-selector";
import { AppDispatch } from "../reducers/redux-store";

import { StarsUnderCard } from "../components/Products/StarsUnderCard/StarsUnderCard";
import { ProductCount } from "../components/Product/ProductCount/ProductCount";
import { ProductButtons } from "../components/Product/ProductButtons/ProductButtons";
import { ProductDescription } from "../components/Products/ProductDescription/ProductDescription";
import { ProductShare } from "../components/Products/ProductShare/ProductShare";
import { ProductCharacteristics } from "../components/Products/ProductCharacteristics/ProductCharacteristics";
import { ProductImg } from "../components/Products/ProductImg/ProductImg";

export const Product = React.memo(() => {
  const productNumber = useParams();
  const dispatch: AppDispatch = useDispatch();
  const productData = useSelector(getProductInformation);

  useEffect(() => {
    if (productNumber.id !== undefined) {
      const isSameId = productData.some(
        (m) => m.id === Number(productNumber.id)
      );
      if (!isSameId) {
        dispatch(dataProduct(+productNumber.id));
      }
    }
  }, []);
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
})
  return (
    <>
      <NavBreadcrumb />
      <section className="mt-8">
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
                      <ProductCount />
                      <ProductButtons />
                      <hr className="my-6" />
                      <ProductCharacteristics product={productDataFiltered} />
                      <ProductShare />
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
      <ProductDescription />
    </>
  );
});


