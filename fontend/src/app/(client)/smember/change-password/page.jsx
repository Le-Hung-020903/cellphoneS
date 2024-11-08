"use client";
import Image from "next/image";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "../../css/smember.css";
import { passwordSchema } from "../../../Utils/rulePassword";
const PageChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current_password: false,
    new_password: false,
    confirm_password: false,
  });
  const api = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },
      validationSchema: passwordSchema,
      onSubmit: async ({
        current_password,
        new_password,
        confirm_password,
      }) => {
        const response = await fetch(`${api}/api/v1/users/changePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password,
            new_password,
            confirm_password,
          }),
          credentials: "include",
        });
        const data = await response.json();
        if (
          data.status === 200 &&
          data.message === "Your password has been successfully updated!"
        ) {
          toast.success(
            "Bạn đã đổi mật khẩu thành công, vui lòng đăng nhập lại!"
          );
          router.push("/auth/login");
        } else {
          toast.error(data.message);
        }
      },
    });

  const handleShowPassword = (value) => {
    setShowPassword((pre) => ({
      ...pre,
      [value]: !pre[value],
    }));
  };
  return (
    <div className="container">
      <div className="changePassword-wrapper">
        <h3>Tạo mật khẩu mới</h3>
        <div className="w-full text-center mt-2">
          <Image
            width={200}
            height={200}
            src={"/images/icon/icon-customer.png"}
            alt="user icon"
          />
        </div>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <h6>Nhập mật khẩu hiện tại</h6>
              <div className="position-relative mt-4">
                <input
                  type={showPassword.current_password ? "text" : "password"}
                  name="current_password"
                  id="current_password"
                  className="change-password-input"
                  placeholder="Nhập mật khẩu hiện tại của bạn"
                  value={values.current_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span>Mật khẩu hiện tại</span>
                {errors.current_password && touched.current_password ? (
                  <p className="mt-1 text-danger">{errors.current_password}</p>
                ) : (
                  ""
                )}
                <span
                  style={{
                    position: "absolute",
                    top: "25px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleShowPassword("current_password")}
                >
                  <FontAwesomeIcon
                    icon={showPassword.current_password ? faEyeSlash : faEye}
                  />
                </span>
              </div>
            </div>
            <div className="mt-5">
              <h6>Tạo mật khẩu mới</h6>
              <div className="position-relative mt-4">
                <input
                  type={showPassword.new_password ? "text" : "password"}
                  name="new_password"
                  id="new_password"
                  className="change-password-input"
                  placeholder="Nhập mật khẩu mới của bạn"
                  value={values.new_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span>Mật khẩu mới</span>
                {errors.new_password && touched.new_password ? (
                  <p className="mt-1 text-danger">{errors.new_password}</p>
                ) : (
                  ""
                )}
                <span
                  style={{
                    position: "absolute",
                    top: "25px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleShowPassword("new_password")}
                >
                  <FontAwesomeIcon
                    icon={showPassword.new_password ? faEyeSlash : faEye}
                  />
                </span>
              </div>
              <div className="position-relative mt-4">
                <input
                  type={showPassword.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  id="confirm_password"
                  className="change-password-input"
                  placeholder="Xác nhận lại mật khẩu"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span>Xác nhận lại mật khẩu</span>
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="mt-1 text-danger">{errors.confirm_password}</p>
                ) : (
                  ""
                )}
                <span
                  style={{
                    position: "absolute",
                    top: "25px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleShowPassword("confirm_password")}
                >
                  <FontAwesomeIcon
                    icon={showPassword.confirm_password ? faEyeSlash : faEye}
                  />
                </span>
              </div>
            </div>
            <div
              className="position-relative w-full mt-5 p-2 rounded-2"
              style={{ backgroundColor: "#E0052B" }}
            >
              <button
                type="submit"
                className="d-inline-block text-center text-white  bg-transparent"
                style={{ width: "100%" }}
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageChangePassword;
