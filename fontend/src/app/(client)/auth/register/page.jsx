"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import { registerSchema } from "../../../Utils/rulesRegister";
const PageRegister = () => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [errorsResponse, setErrorsResponse] = useState({});
  const router = useRouter();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: true,
      },
      validationSchema: registerSchema,
      onSubmit: async ({ name, phone, email, password, status }) => {
        await fetch(`${api}/api/v1/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            password,
            status,
          }),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 201) {
              toast.success("Đăng ký thành công");
              router.push("/auth/login");
            } else if (data.errors && data.errors.email) {
              setErrorsResponse(data?.errors);
              toast.error(`${errorsResponse.email}`);
            } else {
              toast.error("Đăng ký thất bại");
            }
          })
          .catch((err) => toast.error(err.message));
      },
    });

  return (
    <div className="m-24 mx-auto" style={{ marginTop: "100px", width: "40%" }}>
      <div style={{ cursor: "pointer" }}>
        <Link href={"/auth/login"}>
          <FaArrowLeft />
        </Link>
      </div>

      <div
        className="object-fit-contain mx-auto"
        style={{ height: "150px", width: "150px" }}
      >
        <Image
          src="/images/login-img.webp"
          alt="Image register"
          className="w-full"
          width={150}
          height={150}
        />
      </div>
      <h2 className="text-center mt-1">Đăng ký tài khoản Smember</h2>
      <form action="" onSubmit={handleSubmit} style={{ marginTop: "40px" }}>
        <div className="mt-4">
          <label htmlFor="" className="d-none">
            HỌ VÀ TÊN
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nhập họ và tên"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px solid #ccc",
              width: "100%",
              paddingBottom: "10px",
            }}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <p className="mt-1 text-danger">{errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div style={{ marginTop: "40px" }}>
          <label htmlFor="" className="d-none">
            SỐ ĐIỆN THOẠI
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px solid #ccc",
              width: "100%",
              paddingBottom: "10px",
            }}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone ? (
            <p className="mt-1 text-danger">{errors.phone}</p>
          ) : (
            ""
          )}
        </div>
        <div style={{ marginTop: "40px" }}>
          <label htmlFor="" className="d-none">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email"
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
        <div style={{ marginTop: "40px" }}>
          <label htmlFor="" className="d-none">
            MẬT KHẨU
          </label>
          <input
            type="password"
            id="password"
            name="password"
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
        </div>
        <div style={{ marginTop: "40px" }}>
          <label htmlFor="" className="d-none">
            XÁC NHẬN MẬT KHẨU
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            style={{
              outline: "none",
              border: "none",
              borderBottom: "1px solid #ccc",
              width: "100%",
              paddingBottom: "10px",
            }}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="mt-1 text-danger">{errors.confirmPassword}</p>
          ) : (
            ""
          )}
        </div>

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
        <Link href={"/auth/login"} className="text-decoration-none">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};

export default PageRegister;
