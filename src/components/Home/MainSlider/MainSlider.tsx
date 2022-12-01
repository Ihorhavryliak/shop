import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./MainSlider.scss";
import { autoplaySpeedSetting, mainSlider, speedSlider, turnStraits } from "../../../data/mainSlider";
import { SampleNextArrow, SamplePrevArrow } from "../../../utils/sliderStraits";
import { BsArrowRightShort } from "react-icons/bs";
import { ButtonShopNow } from "../../Button/ButtonShopNow";


const MainSlider = React.memo(() => {
 
  let settings = {
    dots: true,
    infinite: true,
    speed: speedSlider,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeedSetting,
    nextArrow: <></>,
    prevArrow: <></>,
    fade: true,
  };
  //add / delete Arrow
  if (turnStraits) {
    settings.nextArrow  = <SampleNextArrow />;
    settings.prevArrow = <SamplePrevArrow />;
  }
  return (
    <section className="mt-8">
    <div className="container">
      <Slider {...settings}>
          {mainSlider.map((m, i) => {
            return(
              <div     key={ `${i}_${m.name}`}>
              <div
            style={{
              background: `url("${m.img}") center center / cover no-repeat`,
              borderRadius: "0.5rem",
            }}
          >
              <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
              <span className="badge text-bg-warning">
                {m.nameDiscount}
              </span>

              <h2 className="text-dark display-5 fw-bold mt-4">
              {m.name}
              {m.price.length > 0 && 
              <span className="price">{m.price}</span>
              }
              </h2>
              <p className="description">
              {m.description}
              </p>
          
              <ButtonShopNow link={m.link} />
            
            </div></div>
            </div>
            )
          })}
      </Slider>
    </div>
    </section>
  );
});

export default MainSlider;
