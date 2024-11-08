import React from "react";
import Slider from "../components/swiper";
const HeroDiscount = () => {
  const listImages = [
    {
      id: 1,
      src: "/images/discount-slider/discount-1.png",
      alt: "images 1",
      width: 2000,
    },
    {
      id: 2,
      src: "/images/discount-slider/discount-2.png",
      alt: "images 2",
      width: 2000,
    },
    {
      id: 3,
      src: "/images/discount-slider/discount-3.png",
      alt: "images 3",
      width: 2000,
    },
  ];
  return (
    <div className="row">
      <Slider listImages={listImages} />
    </div>
  );
};

export default HeroDiscount;
