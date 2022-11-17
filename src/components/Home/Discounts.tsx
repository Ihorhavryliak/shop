import React from "react";

const Discounts = React.memo(() => {
  return (
    <div className="container">
      <div className="row">

     
      <div className="col-6">
        <div
          className="py-1 px-8 rounded-3"
          style={{
            background:
              "url(https://freshcart.codescandy.com/assets/images/banner/grocery-banner-2.jpg)no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="fw-bold mb-1">Freshly Baked Buns</h3>
            <p className="mb-4">
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
          className="py-1 px-8 rounded-3"
          style={{
            background:
              "url(https://freshcart.codescandy.com/assets/images/banner/grocery-banner-2.jpg)no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="fw-bold mb-1">Freshly Baked Buns</h3>
            <p className="mb-4">
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

export default Discounts;
