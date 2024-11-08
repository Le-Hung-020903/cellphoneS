"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Image from "next/image";
import "../(client)/css/swiper.css";

const Thankyou = () => {
  const listImages = [
    {
      id: 1,
      src: "/images/thankyou-customer/customer-1.jpg",
      alt: "images customer 1",
      width: 100,
    },
    {
      id: 2,
      src: "/images/thankyou-customer/customer-2.jpg",
      alt: "images customer 2",
      width: 200,
    },
    {
      id: 3,
      src: "/images/thankyou-customer/customer-3.jpg",
      alt: "images customer 3",
      width: 2000,
    },
    {
      id: 4,
      src: "/images/thankyou-customer/customer-4.jpg",
      alt: "images customer 4",
      width: 2000,
    },
    {
      id: 5,
      src: "/images/thankyou-customer/customer-5.jpg",
      alt: "images customer 5",
      width: 2000,
    },
    {
      id: 6,
      src: "/images/thankyou-customer/customer-6.jpg",
      alt: "images customer 6",
      width: 2000,
    },
    {
      id: 7,
      src: "/images/thankyou-customer/customer-8.jpg",
      alt: "images customer 7",
      width: 2000,
    },
  ];
  return (
    <div className="thankyou-item p-3" style={{ backgroundColor: "#BE1E2D" }}>
      <h2 className="thankyou-title text-white" style={{ fontSize: "30px" }}>
        Cảm ơn HÀNG NGÀN người nổi tiếng cùng HÀNG TRIỆU khách hàng đã và đang
        ủng hộ
      </h2>
      <div className="mt-5">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="swiper mySwiper"
        >
          {listImages?.map((image) => {
            return (
              <SwiperSlide className="swiper-slide thankyou-img" key={image.id}>
                <Image
                  src={image.src}
                  width={image.width}
                  height={100}
                  alt={image.alt}
                  className="img-thumbnail"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Thankyou;
