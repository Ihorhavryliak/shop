
import React from "react";
import { CategorySlider, DiscountsPhoto, FeaturedCategories, MainSlider, PopularProducts } from "../components";




const Home = React.memo(() => {
  return (<main>
      <MainSlider />
    {/*   <CategorySlider /> */}
      <FeaturedCategories />
      <DiscountsPhoto />
      <PopularProducts />
      </main>
  );
});

export  default Home