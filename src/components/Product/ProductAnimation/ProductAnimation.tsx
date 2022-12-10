import React from "react";
import "./ProductAnimation.scss";

export const ProductAnimation = React.memo(() => {
  return (
    <>
      <section className="mt-8">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image__product__width">
                <div className="animate__information">
                  <div className="animate__information__img loading"></div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ps-lg-10 mt-6 mt-md-0">
                <div className="wrapper__text">
                  <div className="animate__bottom__title  loading"></div>
                  <div className="animate__name loading"></div>
                  <div className="animate__surname  loading"></div>
                  <div className="animate__price  loading"></div>
               
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-lg-14 mt-8 ">
        <div className="container">
          <div className="row">
            <div className="wrapper__text">
              <div className="animate__bottom__title loading"></div>
            </div>
            <div className="tab-content">
              <div className="wrapper__text">
              <div className="animate__description loading"></div>
    
              </div>
            </div>
          </div>
      
          <div className="row mt-8">
          <div className="wrapper__text">
              <div className="animate__list__products loading"></div>
            </div>

          </div>
        </div>
      </section>
      {/*   <div className="start__load">
        <div className="animate__information">
          <div className="animate__information__text loading"></div>
          <div className="animate__information__img loading"></div>
        </div>
        <div className="wrapper__text">
          <div className="animate__bottom__title loading"></div>
          <div className="animate__name loading"></div>
          <div className="animate__surname loading"></div>
        </div>
      </div> */}
    </>
  );
});

/* 

*/
