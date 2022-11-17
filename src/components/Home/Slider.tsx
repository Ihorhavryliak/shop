import React from "react";
import sliderOne from '../../assets/sliderOne.jpg';
import sliderTwo from '../../assets/slideTwo.jpg';

const CategorySlider = React.memo(() => {
  return (
    <div className="container">
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src={sliderOne} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
        </div>
        <div className="carousel-item " data-bs-interval="2000">
          <img src={sliderTwo} className="d-block w-100" alt="..." />
        </div>
  
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  );
});

export  default CategorySlider