
import React from "react";
import { Advantages, CategorySlider, DailyBestSells, DiscountsPhoto, FeaturedCategories, MainSlider, PopularProducts } from "../components";




const Home = React.memo(() => {
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