
import React from "react";
import { Advantages, CategorySlider, DailyBestSells, DiscountsPhoto, FeaturedCategories, MainSlider, PopularProducts } from "../components";




const Home = React.memo(() => {
  document.title = 'Shop Store - buy products'
  return (<main>
      <MainSlider />
    {/*   <CategorySlider /> */}
      <FeaturedCategories />
      <DiscountsPhoto />
      <PopularProducts />
      <DailyBestSells />
      <Advantages />
      </main>
  );
});

export  default Home