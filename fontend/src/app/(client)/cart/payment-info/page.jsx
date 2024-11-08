"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import toast from "react-hot-toast";
import "../../css/cart.css";
import { formatMoney } from "../../../Utils/formatMoney";
import { getCartProducts } from "../../../../redux/middlewares/getCartMiddlewares";
import { cartPrice } from "../../../../redux/slice/getCartSlice";
import { getInfo } from "../../../../redux/slice/getLocation";

const PagePaymentInfo = () => {
  const api = `https://province-api-vn.vercel.app/provinces`;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data } = useSWR(api, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const getCarts = useSelector((state) => state.getCart.products);
  const profile = useSelector((state) => state.user.profile);
  const total = useSelector((state) => state.getCart.price);
  const [email, setEmail] = useState(profile?.data?.email);
  const [name, setName] = useState(profile?.data?.name);
  const [phone, setPhone] = useState(profile?.data?.phone);
  const [notes, setNotes] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const { data: getDistricts } = useSWR(
    province
      ? `https://province-api-vn.vercel.app/districts?parent_code=${province}`
      : null,
    fetcher
  );
  const { data: getWards } = useSWR(
    district
      ? `https://province-api-vn.vercel.app/wards?parent_code=${district}`
      : null,
    fetcher
  );
  const handleGetInfo = () => {
    const address = `${city} - ${location}`;
    if (!name || !phone || !province || !district || !city) {
      toast.error("Vui lòng điền vào các trường còn thiếu !");
      return false;
    }
    const recipientData = {
      email,
      phone,
      name,
      notes,
      address,
    };
    dispatch(getInfo(recipientData));
    return true;
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    const isValid = handleGetInfo();
    if (isValid) {
      router.push("/cart/payment");
    }
  };

  useEffect(() => {
    dispatch(getCartProducts());
    dispatch(cartPrice());
  }, [dispatch]);

  return (
    <div
      className="payment-info-wrapper"
      style={{ backgroundColor: "#f2f2f2", paddingBottom: "100px" }}
    >
      <div
        className="mx-auto"
        style={{
          marginTop: "70px",
          width: "40%",
        }}
      >
        <div
          className="payment-info-title position-relative pb-2"
          style={{ borderBottom: "1px solid #e5e5e5" }}
        >
          <Link href={"/cart"}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
                color: "black",
              }}
              className="position-absolute"
            />
          </Link>
          <h2 className="text-center fs-4">Thông tin</h2>
        </div>
        <div className="payment-info-nav d-flex align-items-center gap-5">
          <div
            className={`payment-info-item ${
              pathname === "/cart/payment-info" ? "active" : ""
            }   pb-2 pt-3`}
            style={{
              flex: "1",
              borderBottom: "3px solid #919eab",
              fontWeight: "600",
              color: "#919eab",
              textAlign: "center",
            }}
          >
            1. THÔNG TIN
          </div>
          <div
            className="payment-info-item  pb-2 pt-3"
            style={{
              flex: "1",
              borderBottom: "3px solid #919eab",
              fontWeight: "600",
              color: "#919eab",
              textAlign: "center",
            }}
          >
            2. THANH TOÁN
          </div>
        </div>
        <div
          className="payment-list mt-4 overflow-hidden"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            padding: "12px",
            border: "1px solid rgba(145, 158, 171, .239)",
          }}
        >
          {getCarts?.cart_products?.map((item) => {
            return (
              <article
                className="payment-item d-flex align-items-start"
                key={item.id}
              >
                <div className="mx-3">
                  <Image
                    src={item?.product?.Products_images[0]?.url_image}
                    width={"110"}
                    height={"110"}
                    alt="cart-product"
                  />
                </div>
                <div className="mt-4 w-100">
                  <h3 style={{ fontSize: "16px" }}>{item?.product?.name}</h3>
                  <div className="d-flex justify-content-between align-content-center mt-3">
                    <p
                      style={{
                        color: "red",
                        fontWeight: "500",
                        display: "inline-block",
                      }}
                    >
                      {formatMoney(item?.unit_price)}
                      <span
                        style={{
                          color: "gray",
                          fontSize: "14px",
                          textDecoration: "line-through",
                          marginLeft: "8px",
                        }}
                      >
                        30.000.000đ
                      </span>
                    </p>
                    <p className="d-inline-block">
                      Số lượng:
                      <span
                        style={{
                          color: "red",
                          fontWeight: "500",
                          marginLeft: "4px",
                        }}
                      >
                        {item?.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4 fw-bold">THÔNG TIN KHÁCH HÀNG</p>
        <div
          className="payment-info overflow-hidden"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            padding: "12px",
            border: "1px solid rgba(145, 158, 171, .239)",
          }}
        >
          <div className="p-4">
            <div className="d-flex justify-content-between align-content-center">
              <p style={{ fontSize: "20px", textTransform: "capitalize" }}>
                {profile?.data?.name}
              </p>
              <p style={{ color: "gray" }}>{profile?.data?.phone}</p>
            </div>
            <form action="">
              <label htmlFor="email" style={{ fontSize: "13px" }}>
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                className="payment-input d-block"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
            <p>Hoá đơn VAT sẽ được gửi đến email này</p>
          </div>
        </div>
        <p className="mt-4 fw-bold">THÔNG TIN NHẬN HÀNG</p>
        <div
          className="payment-info overflow-hidden"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
          }}
        >
          <div className="payment-checked d-flex">
            <div
              style={{
                backgroundColor: "#ff6b6b",
                flexGrow: "1",
                color: "white",
                padding: "10px",
                borderBottomLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div className="ms-4">
                <input type="radio" id="shipping" />
                <label htmlFor="shipping" className="ms-2">
                  Giao hàng tại nhà
                </label>
              </div>
            </div>
            <div
              style={{
                flexGrow: "1",
                borderBottomLeftRadius: "10px",
                padding: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div className="ms-2">
                <input type="radio" id="pickup" />
                <label htmlFor="pickup" className="ms-2">
                  Nhận tại cửa hàng
                </label>
              </div>
            </div>
          </div>
          <div className="p-4 row g-4">
            <div className="col-md-6">
              <div className="box-input">
                <label htmlFor="name">TÊN NGƯỜI NHẬN</label>
                <input
                  type="text"
                  id="name"
                  className="d-block w-100 payment-input mt-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ textTransform: "capitalize" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-input">
                <label htmlFor="phone">SĐT NGƯỜI NHẬN</label>
                <input
                  type="text"
                  id="phone"
                  className="d-block w-100 payment-input mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-input">
                <label htmlFor="provinces">TỈNH / THÀNH PHỐ</label>
                <select
                  name="provinces"
                  id="provinces"
                  className="d-block w-100 payment-input mt-2"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="">Chọn Tỉnh/Thành Phố</option>
                  {data?.map((data) => {
                    return (
                      <option value={data.code} key={data.code}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-input">
                <label htmlFor="name"></label>
                <select
                  name="district"
                  id="district"
                  className="d-block w-100 payment-input mt-2"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {getDistricts?.map((data) => {
                    return (
                      <option value={data.code} key={data.code}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-input">
                <label htmlFor="Village"></label>
                <select
                  name="Village"
                  id="Village"
                  className="d-block w-100 payment-input mt-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {getWards?.map((data) => {
                    return (
                      <option value={data.path_with_type} key={data.code}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box-input">
                <label htmlFor="Street"></label>
                <input
                  type="text"
                  id="Street"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="d-block w-100 payment-input mt-2"
                  placeholder="Số nhà, tên đường"
                />
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="">Ghi chú</label>
              <input
                type="text"
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                placeholder="Ghi chú khác (nếu có)"
                className="w-100 payment-input"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            overflow: "hidden",
          }}
          className="p-4 mt-3"
        >
          <div className="d-flex justify-content-between align-content-center">
            <p className="fw-bold">Tổng tiền tạm tính:</p>
            <p style={{ color: "#d70018", fontWeight: "bold" }}>
              {formatMoney(total)}
            </p>
          </div>
          <button
            onClick={(e) => {
              handleRedirect(e);
            }}
            className="d-block w-100 text-center rounded-1 p-2 mt-2"
            style={{
              backgroundColor: "#D70018",
              color: "white",
              textDecoration: "none",
            }}
          >
            Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagePaymentInfo;
