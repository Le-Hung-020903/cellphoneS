"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import "../css/smember.css";
import { clearProfile } from "../../../redux/slice/userSlice";

const Layout = ({ children }) => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [modelLogout, setModelLogout] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const isLogin = profile && profile?.data?.id;
  const isAdmin = profile?.data?.permissions?.includes("admin.manage");
  const handleLogout = async () => {
    try {
      const response = await fetch(`${api}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.status === 200 && data.message === "Logged out successfully") {
        dispatch(clearProfile());
        setModelLogout(false);
        router.push("/auth/login");
      } else {
        throw new Error("Failed to logout");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
      return;
    }
  }, [isLogin, router]);

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#F4F6F8" }}>
        <div className="container">
          <div className="row">
            <div
              className="col-2 pt-3 rounded-2"
              style={{
                backgroundColor: "white",
                position: "fixed",
                top: "100px",
                bottom: "20px",
                height: "auto",
                overflowY: "auto",
              }}
            >
              <ul className="d-flex flex-column list-unstyled">
                <li
                  className={`nav-item ${
                    pathname === "/smember" ? "active" : ""
                  } mt-0 pt-0`}
                >
                  <Link href={"/smember"}>hung</Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/smember/order" ? "active" : ""
                  }`}
                >
                  <Link href={"/smember/order"}>Lịch sử mua hàng</Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/smember/account/user-info" ? "active" : ""
                  }`}
                >
                  <Link href={"/smember/account/user-info"}>
                    Tài khoản của bạn
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/smember/account/support" ? "active" : ""
                  }`}
                >
                  <Link href={"/smember/account/support"}>Hỗ trợ</Link>
                </li>
                <li
                  className={`nav-item ${
                    pathname === "/smember/account/feedback" ? "active" : ""
                  }`}
                >
                  <Link href={"/smember/account/feedback"}>
                    Góp ý - Phản hồi
                  </Link>
                </li>
                {isAdmin && (
                  <li className={`nav-item`}>
                    <Link href={"/admin"}>Quản trị viên</Link>
                  </li>
                )}
                <li className="nav-item" onClick={() => setModelLogout(true)}>
                  <Link href={"/smember"}>Thoát tài khoản</Link>
                </li>
                {modelLogout && (
                  <>
                    <div
                      className={`overlay ${modelLogout ? "active" : ""}`}
                      onClick={() => setModelLogout(false)}
                    ></div>
                    <div
                      className={`model-logout ${modelLogout ? "active" : ""}`}
                    >
                      <h5 className="text-center">
                        Bạn muốn thoát tài khoản ?
                      </h5>
                      <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                        <div style={{ flex: "1" }}>
                          <button
                            className="model-logout-button text-black"
                            onClick={() => setModelLogout(false)}
                          >
                            Không
                          </button>
                        </div>
                        <div
                          style={{
                            flex: "1",
                            textAlign: "center",
                          }}
                        >
                          <button
                            className="model-logout-button text-white"
                            style={{ backgroundColor: "#E0052B" }}
                            onClick={() => handleLogout()}
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </ul>
            </div>
            <div
              className="col-10"
              style={{
                marginLeft: "23%", // Tạo không gian cho cột trái
                paddingTop: "120px", // Khoảng cách từ đầu trang (có thể điều chỉnh)
                width: "75%", // Chiều rộng của nội dung
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
