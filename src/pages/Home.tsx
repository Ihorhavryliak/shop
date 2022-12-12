import React from "react";
import {
  Advantages,
  DailyBestSells,
  DiscountsPhoto,
  FeaturedCategories,
  MainSlider,
  PopularProducts,
} from "../components";

const Home = React.memo(() => {
  document.title = "Shop Store - buy products";
  return (
    <main>
      <MainSlider />
      <FeaturedCategories />
      <DiscountsPhoto />
      <PopularProducts />
      <DailyBestSells />
      <Advantages />
    </main>
  );
});

export default Home;
