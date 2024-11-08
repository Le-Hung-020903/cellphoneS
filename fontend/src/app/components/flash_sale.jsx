"use client";
import React, { useEffect, useState } from "react";
import "../(client)/css/flash_sale.css";
import Image from "next/image";

const FlashSale = () => {
  // function handle calulate time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0);
    const difference = endOfDay - now;
    const timeLeft = {};
    if (difference > 0) {
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / (1000 * 60)) % 60);
      timeLeft.seconds = Math.floor((difference / 1000) % 60);
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flashSale-wrapper text-white p-3"
      style={{ backgroundColor: "#3B0105" }}
    >
      <h2 className="flashSale-title">FLASH SALE</h2>
      <div className="flashSale-countdown d-flex justify-content-end">
        <p className="text-uppercase fs-5 fw-semibold">
          Kết thúc sau:
          <span
            className="mx-2 border d-inline-flex justify-content-center align-items-center text-center p-2 gap-2"
            style={{ width: "60px", height: "60px" }}
          >
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          :
          <span
            className="border mx-2 d-inline-flex justify-content-center align-items-center text-center p-2"
            style={{ width: "60px", height: "60px" }}
          >
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          :
          <span
            className="border ms-2 d-inline-flex justify-content-center align-items-center text-center p-2"
            style={{ width: "60px", height: "60px" }}
          >
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </p>
      </div>
      <div className="flashSale-list row mt-3">
        <article className="flashSale-item text-center col-custom p-2">
          <div className="product-item bg-white p-2 rounded border position-relative">
            <div className="product-img overflow-hidden  mb-2">
              <a href="">
                <Image
                  src={"/images/discount-slider/iphone.jpg"}
                  width={200}
                  height={200}
                  alt="Iphone"
                />
              </a>
            </div>
            <a
              href=""
              className="text-decoration-none text-black fw-semibold text-start"
            >
              <p className="product-title">iPhone 13 128GB | Chính hãng VN/A</p>
            </a>
            <div className="product-price text-start">
              <span className="product-price__show text-danger fw-bold me-2">
                13.990.000đ
              </span>
              <span className="product-price__through text-secondary fw-bold text-decoration-line-through">
                18.990.000đ
              </span>
            </div>
          </div>
        </article>
        <article className="flashSale-item text-center col-custom p-2">
          <div className="product-item bg-white p-2 rounded border position-relative">
            <div className="product-img overflow-hidden  mb-2">
              <a href="">
                <Image
                  src={"/images/discount-slider/iphone.jpg"}
                  width={200}
                  height={200}
                  alt="Iphone"
                />
              </a>
            </div>
            <a
              href=""
              className="text-decoration-none text-black fw-semibold text-start"
            >
              <p className="product-title">iPhone 13 128GB | Chính hãng VN/A</p>
            </a>
            <div className="product-price text-start">
              <span className="product-price__show text-danger fw-bold me-2">
                13.990.000đ
              </span>
              <span className="product-price__through text-secondary fw-bold text-decoration-line-through">
                18.990.000đ
              </span>
            </div>
          </div>
        </article>
        <article className="flashSale-item text-center col-custom p-2">
          <div className="product-item bg-white p-2 rounded border position-relative">
            <div className="product-img overflow-hidden  mb-2">
              <a href="">
                <Image
                  src={"/images/discount-slider/iphone.jpg"}
                  width={200}
                  height={200}
                  alt="Iphone"
                />
              </a>
            </div>
            <a
              href=""
              className="text-decoration-none text-black fw-semibold text-start"
            >
              <p className="product-title">iPhone 13 128GB | Chính hãng VN/A</p>
            </a>
            <div className="product-price text-start">
              <span className="product-price__show text-danger fw-bold me-2">
                13.990.000đ
              </span>
              <span className="product-price__through text-secondary fw-bold text-decoration-line-through">
                18.990.000đ
              </span>
            </div>
          </div>
        </article>
        <article className="flashSale-item text-center col-custom p-2">
          <div className="product-item bg-white p-2 rounded border position-relative">
            <div className="product-img overflow-hidden  mb-2">
              <a href="">
                <Image
                  src={"/images/discount-slider/iphone.jpg"}
                  width={200}
                  height={200}
                  alt="Iphone"
                />
              </a>
            </div>
            <a
              href=""
              className="text-decoration-none text-black fw-semibold text-start"
            >
              <p className="product-title">iPhone 13 128GB | Chính hãng VN/A</p>
            </a>
            <div className="product-price text-start">
              <span className="product-price__show text-danger fw-bold me-2">
                13.990.000đ
              </span>
              <span className="product-price__through text-secondary fw-bold text-decoration-line-through">
                18.990.000đ
              </span>
            </div>
          </div>
        </article>
        <article className="flashSale-item text-center col-custom p-2">
          <div className="product-item bg-white p-2 rounded border position-relative">
            <div className="product-img overflow-hidden  mb-2">
              <a href="">
                <Image
                  src={"/images/discount-slider/iphone.jpg"}
                  width={200}
                  height={200}
                  alt="Iphone"
                />
              </a>
            </div>
            <a
              href=""
              className="text-decoration-none text-black fw-semibold text-start"
            >
              <p className="product-title">iPhone 13 128GB | Chính hãng VN/A</p>
            </a>
            <div className="product-price text-start">
              <span className="product-price__show text-danger fw-bold me-2">
                13.990.000đ
              </span>
              <span className="product-price__through text-secondary fw-bold text-decoration-line-through">
                18.990.000đ
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FlashSale;
