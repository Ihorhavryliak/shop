import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import "./FeaturedCategories.scss";
import categoryImg from "../../../assets/cate.jpg";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../../reducers/products-list-reducer/products-list-selector";
import { Link } from "react-router-dom";

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

  const products = useSelector(getAllProducts);
  const [screenWight, setScreenWight] = useState<number>(() => window.innerWidth);
  const [showSlides, setShowSlides] = useState<number>(() => 6);
  //get and set screen wight
  useEffect(() => {
    const handleResize = () => {
      setScreenWight(() => window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  //set count sliders category
  useEffect(()=>{
    if(screenWight <= 500 ) {
      setShowSlides(() => 2);
    }else if(screenWight > 500  && screenWight <= 768) {
      setShowSlides(() => 2);
    } else if (screenWight > 768  && screenWight <= 968) {
      setShowSlides(() => 4);
    } else {
      setShowSlides(() => 6);
    }
  },[screenWight])


  let settings = {
    /* dots: true, */
    infinite: true,
    slidesToShow: showSlides,
    slidesToScroll: 1,
    autoplay: true,
    speed: 430,
    autoplaySpeed: 1300,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="mb-lg-10 mt-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0 fw-bold">Featured Categories</h3>
          </div>
          </div>
          <Slider {...settings}>
            {products.map((m, i) => {
              return (
                <div key={`${i} s`} className="item">
                  <Link
                    to={`/products/product/${m.id}`}
                    className="text-decoration-none text-inherit"
                  >
                    <div className="card card-product mb-lg-4">
                      <div className="card-body text-center py-8 page_photo">
                        <img
                          src={m.image}
                          alt="Grocery Ecommerce Template"
                          className="img-fluid mb-3 cardImgInBlock mx-auto"
                        />
                        <div className="text-truncate">
                          {`${m.title}`}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
      
      </div>
    </section>
  );
});

export default FeaturedCategories;
function useStats<T>(arg0: () => number): [any, any] {
  throw new Error("Function not implemented.");
}

