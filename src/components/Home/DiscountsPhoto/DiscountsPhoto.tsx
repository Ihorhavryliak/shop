import React from "react";
import "./DiscountsPhoto.scss";
import imgOne from "../../../assets/discount-1.png";
import imgTwo from "../../../assets/discount-2.jpg";
import { ButtonShopNow } from "../../Button/ButtonShopNow";
const DiscountsPhoto = React.memo(() => {
  return (
    <section className="mb-55">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 mb-3 mb-lg-0">
          <div
            className="py-10 px-8 rounded-3"
            style={{
              background: `url(${imgOne})no-repeat`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="fw-bold mb-1">Freshly Baked Buns</h3>
              <p className="mb-3 img__surname">
                Get Upto <span className="fw-bold">25%</span> Off
              </p>
            <ButtonShopNow  />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3 mb-lg-0">
          <div
            className="py-10 px-8 rounded-3"
            style={{
              background: `url(${imgTwo})no-repeat`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h3 className="fw-bold mb-1">Freshly Baked Buns</h3>
              <p className="mb-3 img__surname">
                Get Upto <span className="fw-bold">25%</span> Off
              </p>
              <ButtonShopNow  />
            </div>
          </div>
        </div>
      </div>
    </div></section>
  );
});

export default DiscountsPhoto;
