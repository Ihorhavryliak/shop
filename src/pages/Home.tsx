import React from "react";
import { Link } from "react-router-dom";

import { CategorySlider, Discounts } from "../components";
import Slider from "../components/Home/Slider";

const Home = React.memo(() => {
  return (<main>
    <Link to={'/products'}>products</Link>
      <Slider />
      <CategorySlider />
      <Discounts />
      </main>
  );
});

export  default Home