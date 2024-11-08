import React from "react";
import Image from "next/image";
import Breadcrumb from "../../../components/breadcrumb";
import ProductImg from "../../../components/product_img";
import ProductList from "../../../components/product_card";
import Comments from "../../../components/comments";
import Reviews from "../../../components/reviews";
import AddToCartButton from "../../../components/add_to_cart_button";
import {
  revalidateSimilarProducts,
  revalidateProductDetail,
} from "../../../actions/revalidateData";
import "../../css/device.css";
import "../../css/product_detail.css";
import { formatMoney } from "../../../Utils/formatMoney";

const getSimilarProduct = async (id) => {
  const similarProducts = await fetch(
    `${import.meta.env.NEXT_PUBLIC_API_URL}/api/v1/products/similar/${id}`,
    {
      next: { tags: ["similarProducts"] },
    }
  );
  revalidateSimilarProducts();
  return similarProducts.json();
};

const getProductDetail = async (id) => {
  const product = await fetch(
    `${import.meta.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`,
    {
      next: { tags: ["productDetail"] },
    }
  );
  revalidateProductDetail();
  return product.json();
};

const ProductDetail = async ({ params }) => {
  const { id } = params;
  const response = await getProductDetail(id);
  const similarProducts = await getSimilarProduct(id);
  const product = response?.data?.product;
  const device = response.data.device;
  const manufacturer = response.data.manufacturer;

  return (
    <div className="productDetail-wrapper">
      <div
        className="breadcrumb-wrapper"
        style={{ backgroundColor: "while", marginTop: "65px" }}
      >
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item href={`/products/${device.device}`}>
              {device.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={`/products/${device.device}/${manufacturer.device}`}
            >
              {manufacturer.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={`/products/${device.device}/${manufacturer.device}/${product.categories.device}`}
            >
              {product.categories.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container mt-3">
        <p className="product-title fw-bold h3 text-capitalize">
          {product.name}
        </p>
        <hr />
        <div className="product-img row">
          {/* Left */}
          <div
            className="product-img__left col-lg-8 col-md-12 p-3 mb-0"
            style={{ marginBottom: "100px" }}
          >
            <div
              className="images"
              style={{
                borderRadius: "20px",
              }}
            >
              <ProductImg images={product?.Products_images} />
            </div>
          </div>
          {/* Right */}
          <div className="product-img__right col-lg-4 col-md-12 p-3 mb-0">
            <div className="product-price d-inline-block">
              <p
                className="product-price__inner p-3"
                style={{ borderRadius: "10px", border: "1px solid red" }}
              >
                {formatMoney(product?.price)}
              </p>
            </div>
            <div className="product-img-color">
              <p className="fw-bold fs-5">Chọn màu để xem giá và chi nhánh</p>
              <div className="product-list-color d-flex gap-3">
                {product?.Products_images?.map((image, index) => {
                  return (
                    <div
                      className="product-item-color d-flex justify-content-between px-3 py-2"
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      key={index}
                    >
                      <Image
                        src={image?.url_image}
                        width={40}
                        height={40}
                        alt="Product image color"
                      />
                      <p className="mt-auto fs-6">
                        {formatMoney(product?.price)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-promotions mt-4 rounded overflow-hidden">
              <Image
                src={"/images/product-detail/slider-1.jpg"}
                layout="responsive"
                width={100}
                height={100}
                alt="product promotions"
              />
            </div>
            <div className="add-to-cart mt-4" style={{ height: "80px" }}>
              <div className="add-to-cart__inner d-flex gap-2">
                <div
                  className="w-75 p-2"
                  style={{
                    backgroundColor: "#D70018",
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                >
                  <p className="add-to-cart__buy-now text-uppercase text-white text-center mb-0">
                    mua ngay
                  </p>
                  <p
                    className="add-to-cart-shipping text-center text-white mb-0"
                    style={{ fontSize: "14px" }}
                  >
                    (Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)
                  </p>
                </div>
                <AddToCartButton product_id={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="product-similar row">
          <ProductList products={similarProducts} />
        </div>
      </div>
      <div className="container mt-4">
        <div
          className="product-description product-description-row row g-3"
          style={{ color: "#4A4A4A", fontWeight: 500 }}
        >
          <div className="product-description__left col-lg-9 col-md-12">
            <div className="product-description__left-inner p-2">
              <div
                className="product-description__left-content p-3"
                style={{ backgroundColor: "#F2F2F2", borderRadius: "7px" }}
              >
                <h4
                  className="text-uppercase text-center"
                  style={{ color: "#D70018" }}
                >
                  Đặc điểm nổi bật
                </h4>
                <p className="product-features">{product?.desc}</p>
              </div>
            </div>
            <div className="row">
              <div className="product-review mt-4 col-md-12">
                <Reviews product={product} />
              </div>
            </div>
          </div>
          <div className="product-description__right col-lg-3 col-md-12">
            <div
              className="product-description__right-inner"
              style={{ padding: "20px" }}
            >
              <h4 className="text-black" style={{ fontSize: "17px" }}>
                Thông số kỹ thuật
              </h4>
              <div
                className="product-description__right-content px-1 overflow-hidden"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "7px",
                }}
              >
                {product?.specifications?.map((specification, index) => {
                  return (
                    <div
                      className="product-description__right-specifications row p-1"
                      key={index}
                    >
                      <div className="product-description__right-name col-6">
                        {specification?.name}
                      </div>
                      <div className="product-description__right-info col-6">
                        {specification.info}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <Comments />
      </div>
    </div>
  );
};

export default ProductDetail;
