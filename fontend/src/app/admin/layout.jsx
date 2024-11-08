import Link from "next/link";
import { cookies } from "next/headers";
import React from "react";
import { ProfileProvider } from "./profileContext";
const AdminLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken").value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["AdminDetailOrder"] },
    }
  );
  const data = await response.json();
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-black position-fixed">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <Link
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Shop mobile</span>
            </Link>
            <ul
              className="nav nav-pills w-100 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/modules"}
                  className="nav-link align-middle text-white px-0"
                >
                  <i className="fs-4 bi-house" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị các chức năng
                  </span>
                </Link>
              </li>
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/users"}
                  className="nav-link align-middle text-white px-0"
                >
                  <i className="fs-4 bi-house" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị users
                  </span>
                </Link>
              </li>
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/order"}
                  className="nav-link align-middle text-white px-0"
                >
                  <i className="fs-4 bi-house" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị đơn hàng
                  </span>
                </Link>
              </li>
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/roles"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-speedometer2" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị phân quyền
                  </span>
                </Link>
              </li>
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/categories"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-table" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị danh mục
                  </span>
                </Link>
              </li>
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/products"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-bootstrap" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị sản phẩm
                  </span>
                </Link>
              </li>
              <li className="nav-item w-100 m-0">
                <Link
                  href={"/admin/discount"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-bootstrap" />
                  <span className="ms-1 d-none d-sm-inline">
                    Quản trị mã giảm giá
                  </span>
                </Link>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div className="col py-3" style={{ marginLeft: "18%" }}>
          <ProfileProvider initialProfile={data}>{children}</ProfileProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
