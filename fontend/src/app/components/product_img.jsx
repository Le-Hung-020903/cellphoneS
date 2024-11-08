"use client";
import React, { useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../(client)/css/product_detail.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImg(props) {
  const { images } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-slide mySwiper2 mb-3 overflow-hidden"
      >
        {images?.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={image.url_image}
                alt="image product"
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto py-2"
                style={{ width: 300, height: 400 }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{ cursor: "pointer", height: 90 }}
      >
        {images?.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={image.url_image}
                fill
                alt="image product"
                className="image-thumb py-1"
                style={{ borderRadius: "15px", border: "1px solid #d1d5db" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
