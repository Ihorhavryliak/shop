import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBreadcrumb } from "../components";
import { dataProduct } from "../reducers/product-reducer";
import { getProductInformation } from "../reducers/product-selector";
import { AppDispatch } from "../reducers/redux-store";

export const Product = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const productData = useSelector(getProductInformation);
  useEffect(() => {
    dispatch(dataProduct());
  }, []);

  console.log(productData);
  return (
    <>
      <NavBreadcrumb />
      <section>
        <div className="container">
          {productData.length > 0 &&
            productData.map((m) => {
              return (
                <div className="row" key={m.id}>
                  <div className="col-6">  
                   <img className="img-fluid" src={m.image} alt={m.title} />  
                  </div>
                
                  <div className="col-6">
                    <div className="ps-lg-10 mt-6 mt-md-0">
                      <a className="mb-4 d-block" href="d">
                      {m.category}
                      </a>
                      <h1> {m.title}</h1>
                      <div>{m.rating.rate}</div>
                      <div>{m.price}</div>
                    </div>
                    <hr />

                    <div className="mb-5">
                      <button type="button">Button</button>
                    </div>
                    <div>
                      <div className="input-group input-spinner  ">
                        <input onChange={()=>null}
                          type="button"
                          value="-"
                          className="button-minus  btn  btn-sm "
                          data-field="quantity"
                        />
                        <input onChange={()=>null}
                          type="number"
                          step="1"
                          max="10"
                          value="1"
                          name="quantity"
                          className="quantity-field form-control-sm form-input   "
                        />
                        <input onChange={()=>null}
                          type="button"
                          value="+"
                          className="button-plus btn btn-sm "
                          data-field="quantity"
                        />
                      </div>

                      <div className="row mt-2">
                        <div className="d-grid col-3 ">
                          <button>1</button>
                        </div>
                        <div className=" col-9">
                          <a href="s">s</a>
                          <a href="s">s</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
});
