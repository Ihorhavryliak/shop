import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import "./FeaturedCategories.scss";
import categoryImg from "../../../assets/cate.jpg";
export function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="slick__prev slick__prev__icon slick__arrow"
    >
      <BsChevronLeft className="feather__icon icon__chevron__left" />
    </button>
  );
}

export function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="slick__next slick__arrow"
    >
      <BsChevronRight className="feather__icon icon__chevron__right slick__next__icon" />
    </button>
  );
}

const FeaturedCategories = React.memo(() => {
  let settings = {
    /* dots: true, */
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 4000,
 
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  let a = [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <section className="mb-lg-10 mt-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0">Featured Categories</h3>
          </div>
          </div>
          <Slider {...settings}>
            {a.map((m, i) => {
              return (
                <div key={i} className="item">
                  <a
                    href="../pages/shop-grid.html"
                    className="text-decoration-none text-inherit"
                  >
                    <div className="card card-product mb-lg-4">
                      <div className="card-body text-center py-8">
                        <img
                          src={categoryImg}
                          alt="Grocery Ecommerce Template"
                          className="mb-3"
                        />
                        <div className="text-truncate">
                          Chicken, Meat &amp; Fish {`${m}` + i}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </Slider>
      
      </div>
    </section>
  );
});

export default FeaturedCategories;
