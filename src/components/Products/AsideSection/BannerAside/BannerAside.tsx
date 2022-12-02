import React from "react";
import { ButtonShopNow } from "../../../Button/ButtonShopNow";
import "./BannerAside.scss";
import bannerOne from '../../../../assets/banner-filter.png'
export const BannerAside = React.memo(() => {
  return (
    <div className="mb-8 position-relative">

<div className="position-absolute p-5 py-8">
      <h3 className="mb-0">Fresh Fruits </h3>
      <p>Get Upto 25% Off</p>
      <ButtonShopNow />
    </div>

    <img src={bannerOne} alt="bannerOne" className="img-fluid rounded-3"/>
    </div>
   
  );
});
