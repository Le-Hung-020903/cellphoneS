import React from "react";
import "./css/home.css";
import Image from "next/image";
import Slider from "../components/swiper";
import HeroDiscount from "../components/hero_discount";
import ProductList from "../components/product_card";
import Thankyou from "../components/thankyou";
import Categories from "../components/categories";
import dynamic from "next/dynamic";
import { revalidateProductsDevice } from "../actions/revalidateData";

// Import FlashSale as a dynamic component, with no SSR
const FlashSale = dynamic(() => import("../components/flash_sale"), {
  ssr: false,
});

const getCategory = async () => {
  const rootCategories = await fetch(
    `http://localhost:3000/api/v1/categories`,
    {
      next: { tags: ["categories"] },
    }
  );
  return rootCategories.json();
};

const getProducts = async () => {
  const products = await fetch(`http://localhost:3000/api/v1/products`, {
    next: { tags: ["products"] },
  });
  revalidateProductsDevice();
  return products.json();
};

const PageHome = async () => {
  const categories = await getCategory();
  const products = await getProducts();
  const listImages = [
    {
      id: 1,
      src: "/images/slider/slider-1.jpg",
      alt: "images 1",
      width: 2000,
    },
    {
      id: 2,
      src: "/images/slider/slider-2.jpg",
      alt: "images 2",
      width: 2000,
    },
    {
      id: 3,
      src: "/images/slider/slider-3.jpg",
      alt: "images 3",
      width: 2000,
    },
    {
      id: 4,
      src: "/images/slider/slider-4.jpg",
      alt: "images 4",
      width: 2000,
    },
    {
      id: 5,
      src: "/images/slider/slider-5.jpg",
      alt: "images 5",
      width: 2000,
    },
    {
      id: 6,
      src: "/images/slider/slider-6.jpg",
      alt: "images 6",
      width: 2000,
    },
    {
      id: 7,
      src: "/images/slider/slider-7.jpg",
      alt: "images 7",
      width: 2000,
    },
  ];

  return (
    <div className="py-2" style={{ backgroundColor: "#f2f2f2" }}>
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="hero-container row position-relative">
          <div className="hero-left col-lg-2 bg-white pe-0">
            <Categories categories={categories} products={products} />
          </div>
          <div className="col-lg-8 p-2">
            <Slider listImages={listImages} />
          </div>
          <div className="hero-right col-lg-2 p-2">
            <div className="row">
              <Image
                src={"/images/home/slider-1.jpg"}
                width={155}
                height={150}
                className="rounded-4"
                alt="slider 1"
              />
              <Image
                src={"/images/home/slider-2.jpg"}
                width={155}
                height={150}
                className="rounded-4 mt-2"
                alt="slider 2"
              />
              <Image
                src={"/images/home/slider-3.jpg"}
                width={155}
                height={150}
                className="rounded-4 mt-2"
                alt="slider 3"
              />
            </div>
          </div>
        </div>
        <div className="hero-discount mt-3 rounded overflow-hidden">
          <HeroDiscount />
        </div>
        <div className="flash-sale mt-3 rounded overflow-hidden">
          <FlashSale />
        </div>
        <div className="product-list bg-white rounded p-2 mt-3">
          <ProductList products={products} />
        </div>

        <div className="thankyou-customer rounded my-3 overflow-hidden">
          <Thankyou />
        </div>
      </div>
    </div>
  );
};

export default PageHome;
