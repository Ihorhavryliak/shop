import React, { useEffect } from "react";
import {
  BsCheckCircleFill,
  BsFillExclamationTriangleFill
} from "react-icons/bs";
import { isAddedProductToCart } from "../../reducers/cart-reducer/cart-reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reducers/redux-store";


export const AlertMessageSusses = React.memo(({ isAddedProduct }: { isAddedProduct: boolean | null; }) => {
  /*  isAddedProductToCart */
  const dispatch: AppDispatch = useDispatch();
  const closeWindow = () => {
    dispatch(isAddedProductToCart(null));
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(isAddedProductToCart(null));

    }, 1000);

  }, [isAddedProduct]);

  return (
    <>
      {isAddedProduct === false &&
        <>
          <div
            className={`modal fade   ${isAddedProduct ? "" : "show"} `}
            style={{ display: `${isAddedProduct ? "" : "block"}` }}
          >
            <div className="modal-dialog ">
              <div className="modal-content">
                <div
                  className="alert alert-danger alert-dismissible fade show d-flex align-items-center  mb-0"
                  role="alert"
                >
                  <BsFillExclamationTriangleFill
                    width={60}
                    className="bi flex-shrink-0 me-2 mb-0" />
                  <div>
                    <strong>Error</strong>! Product not added. Try again!
                  </div>
                  <button
                    type="button"
                    onClick={() => closeWindow()}
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>

          </div>
          {/*  <div className="offcanvas-backdrop fade show " ></div> */}
        </>}

      {isAddedProduct === true && (
        <>
          <div
            className={`modal fade   ${isAddedProduct ? "show" : ""} `}
            style={{ display: `${isAddedProduct ? "block" : ""}` }}
          >
            <div className="modal-dialog modal-dialog-end">
              <div className="modal-content">
                <div
                  className="alert alert-success alert-dismissible fade show d-flex align-items-center  mb-0"
                  role="alert"
                >
                  <BsCheckCircleFill
                    width={60}
                    className="bi flex-shrink-0 me-2" />
                  <div>
                    <strong>Success!</strong> Product added to cart.
                  </div>
                  <button
                    type="button"
                    onClick={() => closeWindow()}
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="offcanvas-backdrop fade show " ></div> */}
        </>
      )}

    </>
  );
});
