import React, { useState } from "react";
import "./CartModal.scss";

type CartModalType = {
  isOpenMenu: Boolean;
  setIsOpenMenu: (b: boolean) => void;
};

export const CartModal = React.memo(
  ({ isOpenMenu, setIsOpenMenu }: CartModalType) => {
    return (
      <>
      <div
      className={`offcanvas offcanvas-end  ${
        isOpenMenu ? "show" : "show hiding"
      } `}
      >
        <div className="offcanvas-header border-bottom">
          <div className="text-start">
            <h5 className="mb-0 fs-4">Shop Cart</h5>
            <small>Location</small>
          </div>
          <button
            type="button"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="btn-close text-reset"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div>
            <div className="alert alert-danger p-2">
              You’ve got FREE delivery. Start
              <a href="/" className="alert-link">
                checkout now!
              </a>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item py-3 ps-0 border-top">
              <div className="row align-items-center">
                <div className="col-3 col-md-2">
                  {/* <img src="/" alt="/" className="img-fluid" /> */}
                </div>
                <div className="col-4 col-md-6 col-lg-5">
                  <a href="/" className="text-inherit">
                    <h6 className="mb-0">Haldiram's Sev Bhujia</h6>
                  </a>
                  <span>
                    <small className="text-muted">.98 / lb</small>
                  </span>
                  <div className="mt-2 small lh-1">
                    <a href="/" className="text-decoration-none text-inherit">
                      <span className="me-1 align-text-bottom">remove</span>
                    </a>
                  </div>
                </div>
                <div className="col-3 col-md-3 col-lg-3">
                  <div className="input-group input-spinner  ">
                    <input
                      type="button"
                      value="-"
                      className="button-minus  btn  btn-sm "
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-between mt-4">
            <a href="/" className="btn btn-primary">
              Continue Shopping
            </a>
            <a href="/" className="btn btn-dark">
              Update Cart
            </a>
          </div>
        
        </div>

     
      </div>
      {isOpenMenu && (
          <div
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className={`offcanvas-backdrop  ${
              isOpenMenu ? " fade show" : "fade"
            } `}
          ></div>
        )}
       </>
    );
  }
);
