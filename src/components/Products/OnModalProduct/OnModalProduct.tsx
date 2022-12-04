import React from "react";
import { useSelector } from "react-redux";
import { getIsAuthSelector } from "../../../reducers/auth-reducer/auth-selector";
import "./OnModalProduct.scss";
export type OnModalProductType = {
  isOpenModal: boolean;
  setIsOpenModal: (e: boolean) => void;
  children: any
  size? : number
  childrenTwo?: any
  name: string
};
export const OnModalProduct = React.memo(
  ({ isOpenModal, setIsOpenModal, children, size=1, childrenTwo, name }: OnModalProductType) => {

    return (
      <>

        {isOpenModal && (
          <div
            className={`modal fade  ${isOpenModal ? `show` : ``}`}
            style={{ display: `${isOpenModal ? `block` : `none`}` }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <div className="modal-header border-0">
                <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">{name}</h5>
                    <button
                      onClick={() => setIsOpenModal(!isOpenModal)}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    ></button>     </div>
                  <div className="modal-body">
                {size === 1 ? children :
     
                    <>
                    <div className="col-lg-6">{children}</div>
                    <div className="col-lg-6">{childrenTwo}</div>
                    </>
                 }
                  </div>
           
              </div>
            </div>
          </div>
        )}
        {isOpenModal && <div className="offcanvas-backdrop   fade show "></div>}
      </>
    );
  }
);
