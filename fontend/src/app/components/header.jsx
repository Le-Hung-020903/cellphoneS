"use client";
import React from "react";
import { IoIosListBox } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { FaShippingFast } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { LuUserCircle } from "react-icons/lu";
import { FaPhone } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import "../(client)/css/header.css";

const Header = () => {
  const user = useSelector((state) => state.user.profile);
  const isLogin = user && user?.data?.id;

  return (
    <>
      <header
        className="position-fixed p-1"
        style={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: "#D70018",
        }}
      >
        <div className="container mx-auto">
          <nav className=" d-flex align-items-center row g-2">
            <Link
              href={"/"}
              className="d-inline-block text-center col-lg-2" // style={{ width: "44px" }}
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={60}
                className="object-fit-contain w-100"
              />
            </Link>
            <div
              className="d-flex justify-content-center align-items-center p-2 col-lg-1"
              style={{
                cursor: "pointer",
              }}
            >
              <div
                className="w-100 text-white"
                style={{
                  padding: "10px 5px",
                  borderRadius: "5px",
                  border: "1px solid #DF3346",
                  backgroundColor: "#DF3346",
                }}
              >
                <span>
                  <IoIosListBox />
                </span>
                <span className="ms-1" style={{ fontSize: "13px" }}>
                  Danh mục
                </span>
              </div>
            </div>
            <div
              className="d-flex rounded-md justify-content-center align-items-center p-2 col-lg-1"
              style={{ cursor: "pointer" }}
            >
              <div
                className="w-100 text-white"
                style={{
                  padding: "10px 10px",
                  borderRadius: "5px",
                  border: "1px solid #DF3346",
                  backgroundColor: "#DF3346",
                }}
              >
                <span>
                  <SlLocationPin />
                </span>
                <span className="p-1" style={{ fontSize: "13px" }}>
                  Hà nội
                </span>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="position-relative w-100">
                <FaSearch
                  className="position-absolute text-black"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "5px",
                    outline: "none",
                    border: "none",
                  }}
                />
                <input
                  type="text"
                  name=""
                  placeholder="Bạn cần tìm gì ?"
                  style={{
                    borderRadius: "5px",
                    padding: "6px 6px 6px 30px",
                    border: "none",
                    display: "block",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div className="p-2 col-lg-1">
              <div className="header-item  d-flex gap-2 align-items-center w-100 text-white">
                <FaPhone style={{ fontSize: "20px" }} />
                <span
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span>Mua hàng</span>
                  <span>1800.2097</span>
                </span>
              </div>
            </div>
            <div className="p-2 col-lg-1">
              <div className="header-item text-white d-flex gap-2 justify-content-center align-items-center">
                <span style={{ color: "20px" }}>
                  <SlLocationPin />
                </span>
                <span style={{ fontSize: "14px" }}>
                  Cửa hàng <br /> gần bạn
                </span>
              </div>
            </div>
            <div className="p-2 col-lg-1">
              <div className="header-item d-flex gap-2 justify-content-center align-items-center text-white">
                <span style={{ fontSize: "20px" }}>
                  <FaShippingFast />
                </span>
                <span className="text-white" style={{ fontSize: "14px" }}>
                  Tra cứu <br /> đơn hàng
                </span>
              </div>
            </div>
            <Link
              href={`${isLogin ? "/cart" : "/auth/login"}`}
              className="p-2 col-lg-1 text-decoration-none"
            >
              <div className="header-item d-flex gap-3 justify-content-center align-items-center text-white">
                <span style={{ fontSize: "20px" }}>
                  <PiShoppingCartFill />
                </span>
                <span className="text-white" style={{ fontSize: "14px" }}>
                  Giỏ <br /> hàng
                </span>
              </div>
            </Link>
            <div className="col-lg-1">
              {user && user?.data?.name ? (
                <Link
                  href={"/smember"}
                  className="d-flex flex-column justify-content-center align-items-center py-1 px-2 text-white"
                  style={{
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                    cursor: "pointer",
                    border: "1px solid #DF3346",
                    backgroundColor: "#DF3346",
                    textTransform: "capitalize",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    <LuUserCircle />
                  </span>
                  {user?.data?.name}
                </Link>
              ) : (
                <button
                  className="d-flex flex-column justify-content-center align-items-center py-1 px-2"
                  data-bs-target="#loginModal"
                  data-bs-toggle="modal"
                  style={{
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                    border: "1px solid #DF3346",
                    backgroundColor: "#DF3346",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    <LuUserCircle />
                  </span>
                  Đăng nhập
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
      <div
        className="modal fade"
        id="loginModal"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Smember
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-evenly">
              <div>
                <Link href={"/auth/register"} className="text-decoration-none">
                  Đăng ký
                </Link>
              </div>
              <div>
                <Link href={"/auth/login"} className="text-decoration-none">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
