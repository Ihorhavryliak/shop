

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import { getProducts } from "../../reducers/products-list-reducer/products-list-reducer";
import { getAllProducts } from "../../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../../reducers/redux-store";
import { NextArrow, PrevArrow } from "../Home/FeaturedCategories/FeaturedCategories";
import { CartProduct } from "../Products";
import "./WrapperPopular.scss";

type WrapperPopularType = {
  title: string
}
const WrapperPopular = React.memo((props: WrapperPopularType) => {
  const {title = 'Popular Products'} = props;
  const products = useSelector(getAllProducts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts('asc', '100'));
  }, []);
//
const [screenWight, setScreenWight] = useState<number>(() => window.innerWidth);
const [showSlides, setShowSlides] = useState<number>(() => 5);
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
    setShowSlides(() => 5);
  }
},[screenWight]) 


let settings = {
  /* dots: true, */
  infinite: true,
  slidesToShow: showSlides,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

  return (
    <section className="my-lg-14 my-14">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0 fw-bold">{title}</h3>
          </div>
        </div>
      
   <Slider {...settings}>
          {products.slice(0,10).map((m) => (
              <CartProduct m={m} key={m.id} keyAdd={'product'} kind={'wrapper'} />  
          ))}
          </Slider> 
        
          </div>
    </section>
  );
});

export default WrapperPopular;
