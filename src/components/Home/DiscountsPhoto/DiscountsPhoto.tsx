import React from "react";
import "./DiscountsPhoto.scss";
import imgOne from "../../../assets/discount-1.png";
import imgTwo from "../../../assets/discount-2.jpg";
const DiscountsPhoto = React.memo(() => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
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
              <a href="#!" className="btn btn-dark">
                Shop Now
              </a>
            </div>
          </div>
        </div>
        <div className="col-6">
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
              <a href="#!" className="btn btn-dark">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DiscountsPhoto;
