"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faArrowDownWideShort,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ButtonFilter = () => {
  // Lấy pathname hiện tại
  const pathname = usePathname();

  // Dùng router để chuyển hướng
  const router = useRouter();

  // Dùng search params để lấy ra filter_price và dir trên url để kiểm tra
  // xem có active hay không
  const searchParams = useSearchParams();

  const filterProduct = (pathname, filter) => {
    return router.push(`${pathname}?order=filter_price&dir=${filter}`);
  };

  const isPriceAsc =
    searchParams.get("order") === "filter_price" &&
    searchParams.get("dir") === "asc";

  const isPriceDesc =
    searchParams.get("order") === "filter_price" &&
    searchParams.get("dir") === "desc";

  return (
    <>
      <div className="row g-2">
        <button
          className={`filter-product-desc bg-transparent col-lg-2 p-2 ${
            isPriceDesc ? "active" : ""
          }`}
          onClick={() => {
            filterProduct(pathname, "desc");
          }}
        >
          <div className="p-2">
            <span className="filter-product-svg me-2">
              <FontAwesomeIcon icon={faArrowUpWideShort} />
            </span>
            Giá Cao - Thấp
          </div>
        </button>
        <button
          className={`filter-product-asc bg-transparent col-lg-2 ${
            isPriceAsc ? "active" : ""
          }`}
          onClick={() => {
            filterProduct(pathname, "asc");
          }}
        >
          <div className="p-2">
            <span className="filter-product-svg me-2">
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            </span>
            Giá Thấp - Cao
          </div>
        </button>
        <button className="filter-product-promotion bg-transparent col-lg-2">
          <div className="p-2">
            <span className="filter-product-svg me-2">
              <FontAwesomeIcon icon={faFire} />
            </span>
            Khuyến Mãi Hot
          </div>
        </button>
      </div>
    </>
  );
};

export default ButtonFilter;
