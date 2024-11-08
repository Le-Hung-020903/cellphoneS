"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import "../(client)/css/swiper.css";

const Slider = (props) => {
  const { listImages } = props;
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper mySwiper"
      >
        {listImages.map((image) => {
          return (
            <SwiperSlide className="swiper-slide" key={image.id}>
              <Image
                src={image.src}
                width={image.width}
                height={100}
                alt={image.alt}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
