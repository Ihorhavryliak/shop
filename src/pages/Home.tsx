
import React from "react";
import { CategorySlider, Discounts, MainSlider } from "../components";




const Home = React.memo(() => {
  return (<main>
      <MainSlider />
      <CategorySlider />
      <Discounts />
      </main>
  );
});

export  default Home