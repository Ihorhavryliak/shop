import React from "react";
import "./ProductsAnimation.scss";

export const ProductsAnimation = React.memo(() => {
  const temporaryData = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <>
    <main>
      <section className="mt-8 mb-lg-14 mb-8">
        <div className="container">
          <div className="row  gx-10">
            <div className="col-lg-3 col-md-4 mb-6 mb-md-0 d__sm__none">
              <div className="image__product__width">
                <div className="animates__information">
                  <div className="animates__information__img loading"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="ps-lg-10 mt-6 mt-md-0">
                <div className="wrapper__text">
                  <div className="animates__bottom__title  loading"></div>
                  <div className="animates__name loading"></div>
                  <div className="animates__surname  loading"></div>
                  <div className="animates__price  loading"></div>
                 

                
                  
             
                </div>
                <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
     
                  {temporaryData.map(m=>{return(
                           
                          
                                
                                <div  key={`${m}_____`} className="col">
                                <div className="wrapper__text">
                                <div className="animations__product__list loading">
                                </div>
                                </div>
                           
                            </div>
                        
                  )})}
                      </div>   
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

    </>
  );
});

/* 

*/
