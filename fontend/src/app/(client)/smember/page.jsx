"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "../css/smember.css";
import { getFavoriteProducts } from "../../../redux/middlewares/getFavoriteMiddleware";
import { getQuantityOrder } from "../../../redux/middlewares/getQuantityOrder";
import ProductList from "../../components/product_card";
const PageSmember = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const favoriteProducts = useSelector(
    (state) => state.favoriteProducts.favoriteProducts
  );
  const quantity = useSelector((state) => state.getQuantityOrder.quantity);

  useEffect(() => {
    dispatch(getFavoriteProducts());
    dispatch(getQuantityOrder());
  }, [dispatch]);

  return (
    <div className="container" style={{ height: "1000px" }}>
      <div className="smember">
        <div className="smember-profile d-flex gap-3">
          <Image
            src={"/images/logo/avatar.jpg"}
            width={80}
            height={80}
            alt="smember-profile"
          />
          <div>
            <p style={{ textTransform: "uppercase", marginBottom: "0px" }}>
              hungg dinh le
            </p>
            <p className="mt-1">0383545843</p>
          </div>
        </div>
        <div
          className="smember-order mt-4 bg-white d-inline-block rounded-3"
          style={{ width: "500px", padding: "40px 0" }}
        >
          <div className="d-flex">
            <div
              style={{
                flex: "1",
                textAlign: "center",
                borderRight: "1px solid black",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginBottom: "5px",
                }}
              >
                {quantity ?? 0}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              >
                đơn hàng
              </span>
            </div>
            <div style={{ flex: "1", textAlign: "center" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginBottom: "5px",
                }}
              >
                0đ
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              >
                Tổng tiền tích luỹ
              </span>
            </div>
          </div>
        </div>
        <div
          className="smember-navigation w-full mt-4 d-flex gap-3 rounded-3 bg-white"
          style={{ padding: "15px" }}
        >
          <Link
            href={"/smember/order"}
            style={{
              cursor: "pointer",
              width: "90px",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <span className="smember-navigation-icon">
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ width: "20px", height: "20px", color: "black" }}
              />
            </span>
            Lịch sử mua hàng
          </Link>
          <Link
            href={"/smember/account/user-info"}
            style={{
              cursor: "pointer",
              width: "90px",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <span className="smember-navigation-icon">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ width: "20px", height: "20px", color: "black" }}
              />
            </span>
            Sổ địa chỉ
          </Link>
        </div>
        <h5 className="mt-4">Sản phẩm bạn yêu thích</h5>
        <div className="smember-favorite-product">
          <ProductList products={favoriteProducts} />
        </div>
      </div>
    </div>
  );
};

export default PageSmember;
