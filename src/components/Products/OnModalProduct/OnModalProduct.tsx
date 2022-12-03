import React from "react";
import "./OnModalProduct.scss";
type OnModalProductType = {
  isOpenModal: boolean;
  setIsOpenModal: (e: boolean) => void;
};
export const OnModalProduct = React.memo(
  ({ isOpenModal, setIsOpenModal }: OnModalProductType) => {
    return (
      <>
 
        {isOpenModal && (
          <div
            className={`modal fade  ${isOpenModal ? `show` : ``}`}
            style={{ display: `${isOpenModal ? `block` : `none`}` }}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body p-8">
                  <div className="position-absolute top-0 end-0 me-3 mt-3">
                    <button
                      onClick={() => setIsOpenModal(!isOpenModal)}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="row">
                    {/*     img section */}
                    <div className="col-lg-6">test</div>
                    {/*     img information */}
                    <div className="col-lg-6">test</div>
                  </div>
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
