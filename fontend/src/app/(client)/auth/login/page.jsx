"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import Link from "next/link";
import { loginSchema } from "../../../Utils/ruleLogin";
const PageLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async ({ email, password }) => {
        await fetch(
          `${import.meta.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
            credentials: "include",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              toast.success("Đăng nhập thành công");
              window.location.href = "/";
            } else if (data.errors) {
              toast.error(`Tài khoản hoặc mật khẩu không đúng`);
            } else {
              toast.error("Đã có lỗi xảy ra");
            }
          })
          .catch((err) => toast.error(err.message));
      },
    });
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="m-24  mx-auto" style={{ marginTop: "100px", width: "40%" }}>
      <div
        className="object-fit-contain mx-auto"
        style={{ height: "150px", width: "150px" }}
      >
        <Image src="/images/login-img.webp" alt="" width={150} height={150} />
      </div>
      <h2 className="text-center mt-3">Đăng nhập tài khoản Smember</h2>
      <form action="" onSubmit={handleSubmit} className="mt-7">
        <div className="mt-5">
          <label htmlFor="" className="d-none">
            SỐ ĐIỆN THOẠI/EMAIL
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Nhập số điện thoại/email"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px solid #ccc",
              width: "100%",
              paddingBottom: "10px",
            }}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className="mt-1 text-danger">{errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="position-relative mt-5">
          <label htmlFor="" className="d-none">
            MẬT KHẨU
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Nhập mật khẩu"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px solid #ccc",
              width: "100%",
              paddingBottom: "10px",
            }}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className="mt-1 text-danger">{errors.password}</p>
          ) : (
            ""
          )}
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleShowPassword()}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <a href="#!" className="text-right d-block mt-4">
          Quên mật khẩu?
        </a>
        <button
          type="submit"
          className="btn btn-danger"
          style={{ width: "100%", marginTop: "40px" }}
        >
          Đăng nhập
        </button>
      </form>
      <div
        className="position-relative"
        style={{
          height: "1px",
          width: "100%",
          background: "gray",
          marginTop: "50px",
        }}
      >
        <p className="position-absolute start-50 top-50 translate-middle bg-white px-3">
          hoặc đăng nhập bằng
        </p>
      </div>
      <div className="d-flex align-items-center justify-content-evenly gap-7 mt-5">
        <div
          className="d-flex justify-content-center align-items-center gap-4"
          style={{ cursor: "pointer" }}
        >
          <div style={{ width: "50px", height: "50px" }}>
            <Image
              src="/images/auth-google.webp"
              alt=""
              width={50}
              height={50}
            />
          </div>
          <p style={{ marginTop: "13px" }}>Google</p>
        </div>
        <div
          className="d-flex align-items-center justify-content-center gap-4"
          style={{ cursor: "pointer" }}
        >
          <div style={{ width: "50px", height: "50px" }}>
            <Image
              src="/images/auth-facebook.webp"
              alt=""
              width={50}
              height={50}
            />
          </div>
          <p style={{ marginTop: "13px" }}>Facebook</p>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 gap-1">
        <p>Bạn chưa có tài khoản? </p>
        <Link href={"/auth/register"} className="text-decoration-none">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};

export default PageLogin;
