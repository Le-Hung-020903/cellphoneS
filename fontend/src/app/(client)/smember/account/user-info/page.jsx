"use client";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import "../../../css/smember.css";
import Link from "next/link";
const PageUserInfo = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <div className="container">
      <div className="account-wrapper w-75 mx-auto mb-5">
        <div className="user-info-img" style={{ textAlign: "center" }}>
          <Image
            width={100}
            height={100}
            alt="user information"
            src={"/images/icon/icon-customer.png"}
          />
        </div>
        <p className="text-center text-capitalize mt-2 fw-bold fs-5s">
          {profile?.data?.name ?? "Chưa có tên"}
        </p>
        <div className="user-info-input mt-3">
          <div className="position-relative mt-3">
            <input
              type="text"
              name=""
              id=""
              placeholder={`Họ và tên: ${profile?.data?.name ?? "Chưa có"}`}
              className="user-info-input-item"
            />
            <label htmlFor="" className="user-info-label">
              Họ và tên:
            </label>
          </div>
          <div className=" mt-4">
            <input
              type="text"
              name=""
              id=""
              placeholder={`Email: ${profile?.data?.email ?? "Chưa có"}`}
              className="user-info-input"
              readOnly
            />
          </div>
          <div className=" mt-4">
            <input
              type="text"
              name=""
              id=""
              placeholder={`Số điện thoại: ${
                profile?.data?.phone ?? "Chưa có"
              }`}
              className="user-info-input"
              readOnly
            />
          </div>
          <div className=" mt-4">
            <input
              type="text"
              name=""
              id=""
              placeholder={`Ngày tham gia Smember: ${
                profile?.data?.phone ?? "Chưa có"
              }`}
              className="user-info-input"
              readOnly
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              name=""
              id=""
              placeholder={`Tổng tiền đã mua sắm: ${
                profile?.data?.phone ?? "Chưa có"
              }`}
              className="user-info-input"
              readOnly
            />
          </div>
          <Link
            href={"/smember/change-password"}
            style={{
              display: "inline-block",
              width: "100%",
              cursor: "pointer",
              color: "#757575",
              textDecoration: "none",
              marginTop: "30px",
            }}
          >
            Đổi mật khẩu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageUserInfo;
