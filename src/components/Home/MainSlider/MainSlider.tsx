import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./MainSlider.scss";
import { mainSlider, speedSliders, turnStraits } from "../../../data/mainSlider";
import { SampleNextArrow, SamplePrevArrow } from "../../../utils/sliderStraits";
import { BsArrowRightShort } from "react-icons/bs";



const MainSlider = React.memo(() => {
  let settings = {
    dots: true,
    infinite: true,
    speed: speedSliders,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  //add / delete Arrow
  if (turnStraits) {
    settings.nextArrow  = <SampleNextArrow />;
    settings.prevArrow = <SamplePrevArrow />;
  }
  return (
    <div className="container">
      <Slider {...settings}>
    
          {mainSlider.map((m, i) => {
            return(
              <div>
              <div
              key={i + m.name}
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
              </h2>
              <p className="description">
              {m.description}
              </p>
              <a href="#!" className="btn btn-dark mt-3">
              {m.nameButton} <BsArrowRightShort />
              </a>
            </div></div>
            </div>
            )
          })}
      </Slider>
    </div>
  );
});

export default MainSlider;
