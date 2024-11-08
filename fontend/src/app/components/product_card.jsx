import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

import Link from "next/link";
import "../(client)/css/home_product.css";
import ButtonFilter from "../components/button_favorite";
import { formatMoney } from "../Utils/formatMoney";

const ProductList = ({ products }) => {
  return (
    <div className="row g-3">
      {/* <h2>Điện thoại nổi bật</h2> */}
      {products?.data?.products?.map((product) => {
        return (
          <div className="col-custom text-center" key={product.id}>
            <div className="product-item p-2 rounded border position-relative">
              {product?.discount[0]?.discount_code && (
                <div>
                  <div
                    className="product-discount position-absolute"
                    style={{ left: "-4px", top: "-2px" }}
                  >
                    <Image
                      src={"/images/icon/discount.png"}
                      width={80}
                      height={30}
                      alt="discount"
                    />
                  </div>
                  <span
                    className=" position-absolute text-white top-0 mt-1"
                    style={{ left: "12px", fontSize: "12px" }}
                  >
                    {`Giảm ${product?.discount[0]?.discount_code}%`}
                  </span>
                </div>
              )}
              <div
                className="product-installment position-absolute top-0  border border-info text-info rounded p-1 fw-bold"
                style={{ fontSize: "12px", right: "0px" }}
              >
                <span>Trả góp 0%</span>
              </div>
              <div className="product-img overflow-hidden mb-3 mt-5">
                <Link href={`/product-detail/${product.id}`}>
                  <Image
                    src={`${product?.Products_images[0]?.url_image}`}
                    width={200}
                    height={200}
                    alt="Iphone"
                  />
                </Link>
              </div>
              <Link
                href={`/product-detail/${product.id}`}
                className="text-decoration-none text-black fw-semibold text-start"
              >
                <p className="product-title my-1" style={{ height: "50px" }}>
                  {product?.name}
                </p>
              </Link>
              <div className="product-price text-start">
                <span className="product-price__show text-danger fw-bold me-2">
                  {formatMoney(product?.price)}
                </span>
                <span className="product-price__through text-secondary fw-bold text-decoration-line-through">
                  {formatMoney(18990000)}
                </span>
              </div>
              <div
                className="product-promotions border rounded text-start p-2 my-1"
                style={{ backgroundColor: "#F3F4F6", fontSize: "13px" }}
              >
                <p>
                  Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn
                  3-6 tháng
                </p>
              </div>
              <div className="product-favorite d-flex justify-content-between align-items-center">
                <div className="product-quality">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className=" ms-auto text-secondary">Yêu thích</span>
                <ButtonFilter productId={product.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
