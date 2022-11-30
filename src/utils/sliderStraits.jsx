import React from 'react'

export const sliderStraits = () => {
  return (
    <div>sliderStraits</div>
  )
}


export function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleInterval"
      data-bs-slide="next"
      onClick={onClick}
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  );
}

export function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleInterval"
      data-bs-slide="prev"
      onClick={onClick}
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
  );
}