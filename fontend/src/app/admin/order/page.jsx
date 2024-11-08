"use client";
import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FaEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import "../../(client)/css/admin.css";
import { convert } from "../../Utils/convertDay";
import { formatMoney } from "../../Utils/formatMoney";
const PageOrder = () => {
  const [status, setStatus] = useState("");
  const [active, setActive] = useState({
    all: true,
    pending: false,
    confirmed: false,
    shipping: false,
    delivered: false,
    returns: false,
    canceled: false,
  });
  const [order, setOrder] = useState({
    customerName: "",
    product: [],
    amount: 0,
    paymentMethod: "",
    deliveryStatus: "",
  });
  const [showModelEdit, setShowModelEdit] = useState(true);
  const api = process.env.NEXT_PUBLIC_API_URL;
  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${api}/api/v1/admin/orders?status=${status}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }
  const convertPayment = (value) => {
    switch (value) {
      case "Thanh toán khi nhận hàng":
        return "COD";
      case "Chuyển khoản ngân hàng qua mã QR":
        return "QR";
      default:
        return "Unknown"; // hoặc bất kỳ giá trị mặc định nào bạn muốn
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-white";
      case "confirmed":
        return "bg-primary text-white";
      case "shipping":
        return "bg-info text-white";
      case "delivered":
        return "bg-success text-white";
      case "canceled":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const handleFilterStatus = (status, order_status) => {
    setStatus(status);
    // khi key === order_status tức là khi truyền vào là ALL
    // thì ALL sẽ bằng với ALL khi click và 2 value equal
    // nếu order_status truyền vào mà not equal với click thì là false
    setActive((pre) => {
      const newActive = {};
      for (const key in pre) {
        newActive[key] = key === order_status;
      }
      return newActive;
    });
  };
  const handleOpenModelEdit = () => {
    setShowModelEdit(!showModelEdit);
  };
  return (
    <div className="container">
      <div className="Order-wrapper">
        <h1>Danh sách đơn hàng</h1>
        <div className="d-flex gap-3 justify-content-end align-items-center">
          <button className="btn btn-primary">Create Order</button>
          <button className="btn bg-success text-white">Import</button>
        </div>
        <div className="row mt-5">
          <div className="col-5">
            <input
              type="text"
              placeholder="Tìm kiếm ID đơn hàng, customer, order status"
              className="w-100 input-item"
            />
          </div>
          <div className="col-2">
            <input
              type="date"
              name=""
              id=""
              placeholder="Chọn ngày"
              className="w-100 input-item"
            />
          </div>
          <div className="col-2">
            <select name="" id="" className="w-100 input-item">
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="">Confirmed</option>
              <option value="">shipping</option>
              <option value="">Delivered</option>
              <option value="">Canceled</option>
            </select>
          </div>
          <div className="col-2">
            <select name="" id="" className="w-100 input-item">
              <option value="">All</option>
              <option value="pending">COD</option>
              <option value="">Qr Code</option>
            </select>
          </div>
          <div className="col-1">
            <button className="w-100">Filter</button>
          </div>
        </div>
        <div className="d-flex gap-5 mt-5">
          <div
            className={`filter-item ${active.all ? "active" : ""}`}
            onClick={() => handleFilterStatus("", "all")}
          >
            <span>
              <FaBorderAll />
            </span>
            <p>All</p>
          </div>
          <div
            className={`filter-item ${active.pending ? "active" : ""}`}
            onClick={() => handleFilterStatus("pending", "pending")}
          >
            <span>
              <MdOutlinePendingActions />
            </span>
            <p>Pending</p>
          </div>
          <div
            className={`filter-item ${active.confirmed ? "active" : ""}`}
            onClick={() => handleFilterStatus("confirmed", "confirmed")}
          >
            <span>
              <GiConfirmed />
            </span>
            <p>Confirmed</p>
          </div>
          <div
            className={`filter-item ${active.shipping ? "active" : ""}`}
            onClick={() => handleFilterStatus("shipping", "shipping")}
          >
            <span>
              <FaShippingFast />
            </span>
            <p>Shipping</p>
          </div>
          <div
            className={`filter-item ${active.delivered ? "active" : ""}`}
            onClick={() => handleFilterStatus("delivered", "delivered")}
          >
            <span>
              <Image
                width={20}
                height={20}
                src={"/images/icon/delivered (1).png"}
                alt={"delivered"}
                style={{ color: "black" }}
              />
            </span>
            <p>Delivered</p>
          </div>
          <div
            className={`filter-item ${active.returns ? "active" : ""}`}
            onClick={() => handleFilterStatus("returns", "returns")}
          >
            <span>
              <FontAwesomeIcon icon={faRightLeft} />
            </span>
            <p>Returns</p>
          </div>
          <div
            className={`filter-item ${active.canceled ? "active" : ""}`}
            onClick={() => handleFilterStatus("canceled", "canceled")}
          >
            <span>
              <MdOutlineCancel />
            </span>
            <p>Canceled</p>
          </div>
        </div>
        <div className="w-100">
          <table className="table table-bordered w-100">
            <thead>
              <tr>
                <th width="8%" className="text-center">
                  ORDER ID
                </th>
                <th width="15%" className="text-center">
                  CUSTOMER
                </th>
                <th width="20%" className="text-center">
                  PRODUCT
                </th>
                <th width="15%" className="text-center">
                  ORDER DATE
                </th>
                <th className="text-center">AMOUNT</th>
                <th width="15%" className="text-center">
                  PAYMENT METHOD
                </th>
                <th className="text-center">STATUS</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item) => {
                return (
                  <tr key={item?.order_id}>
                    <td className="text-center">
                      {item?.order_id ?? "chưa có"}
                    </td>
                    <td className="text-center">
                      {item?.recipient_name ?? "Chưa có"}
                    </td>
                    <td>
                      <p className="mb-0">
                        {item?.order_detail?.product_name ?? "Chưa có"}
                      </p>
                      <span style={{ fontSize: "12px" }}>
                        {item?.order_detail?.additional_products ?? ""}
                      </span>
                    </td>
                    <td className="text-center">
                      {convert(item?.created_at) ?? "Chưa có"}
                    </td>
                    <td className="text-center">
                      {formatMoney(item?.order_detail?.price) ?? "Chưa có"}
                    </td>
                    <td className="text-center">
                      {convertPayment(item?.payment_method) ?? "Chưa có"}
                    </td>
                    <td className="text-center">
                      <span
                        className={`${getStatusClass(
                          item?.order_status
                        )} p-1 rounded`}
                      >
                        {item?.order_status}
                      </span>
                    </td>
                    <td className="d-flex align-items-center justify-content-center gap-2 text-center">
                      <Link href={`/admin/order/${item?.order_id}`}>
                        <span
                          style={{ cursor: "pointer", color: "black" }}
                          title="View"
                        >
                          <FaEye />
                        </span>
                      </Link>
                      <span
                        style={{ cursor: "pointer" }}
                        title="Edit"
                        onClick={handleOpenModelEdit}
                      >
                        <TiPencil />
                      </span>
                      {showModelEdit && (
                        <>
                          <div
                            className={`overlay ${
                              showModelEdit ? "active" : ""
                            }`}
                            onClick={handleOpenModelEdit}
                          ></div>
                          <div
                            className={`model-edit ${
                              showModelEdit ? "active" : ""
                            }`}
                          >
                            <div
                              style={{
                                backgroundColor: "#f3f6f9",
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",
                                padding: "6px",
                              }}
                            >
                              <h4 className="mb-0">Edit Order</h4>
                              <span
                                style={{
                                  cursor: "pointer",
                                  fontSize: "25px",
                                }}
                                onClick={handleOpenModelEdit}
                              >
                                <HiOutlineXMark />
                              </span>
                            </div>
                            <div className="p-3">
                              <div className="model-input">
                                <label
                                  htmlFor="name"
                                  className="w-100 text-start mb-2"
                                >
                                  Customer Name
                                </label>
                                <input
                                  type="text"
                                  name=""
                                  id="name"
                                  value={order.name}
                                  className="w-100 p-1"
                                />
                              </div>
                              <div className="model-input mt-3">
                                <label
                                  htmlFor="name"
                                  className="w-100 text-start mb-2"
                                >
                                  Product
                                </label>
                                <input
                                  type="text"
                                  name=""
                                  id="name"
                                  className="w-100 p-1"
                                />
                              </div>
                              <div className="model-input mt-3">
                                <label
                                  htmlFor="name"
                                  className="w-100 text-start mb-2"
                                >
                                  Amount
                                </label>
                                <input
                                  type="text"
                                  name=""
                                  id="name"
                                  className="w-100 p-1"
                                />
                              </div>
                              <div className="model-input mt-3">
                                <label
                                  htmlFor="name"
                                  className="w-100 text-start mb-2"
                                >
                                  Payment Method
                                </label>
                                <input
                                  type="text"
                                  name=""
                                  id="name"
                                  className="w-100 p-1"
                                />
                              </div>
                              <div className="model-input mt-3">
                                <label
                                  htmlFor="name"
                                  className="w-100 text-start mb-2"
                                >
                                  Delivery Status
                                </label>
                                <input
                                  type="text"
                                  name=""
                                  id="name"
                                  className="w-100 p-1"
                                />
                              </div>
                            </div>
                            <div className=" d-flex gap-4 p-3 justify-content-end align-items-center">
                              <button
                                className="btn btn-danger"
                                onClick={handleOpenModelEdit}
                              >
                                Close
                              </button>
                              <button className="btn btn-primary">
                                Update
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      <span style={{ cursor: "pointer" }} title="Remove">
                        <FaRegTrashAlt />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageOrder;
