"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import "../../css/cart.css";
import { getLatestOrder } from "../../../../redux/middlewares/getLatestOrderMiddlewares";
import { formatMoney } from "../../../Utils/formatMoney";
const PageSuccess = () => {
  const dispatch = useDispatch();
  const latestOrder = useSelector((state) => state.getLatestOrder.latestOrder);
  const {
    payment_method,
    total_price,
    recipient_name,
    shipping_address,
    recipient_phone,
    recipient_email,
    order_code,
    order_details,
    notes,
  } = latestOrder;
  const quantity = order_details?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(getLatestOrder());
  }, [dispatch]);
  return (
    <div
      className="payment-wrapper"
      style={{ backgroundColor: "#F4F6F8", paddingBottom: "100px" }}
    >
      <div
        className="mx-auto"
        style={{
          marginTop: "70px",
          width: "40%",
        }}
      >
        <div
          className="success-title position-relative pb-2"
          style={{ borderBottom: "1px solid #e5e5e5" }}
        >
          <h2 className="text-center fs-4">Hoàn tất đơn hàng</h2>
        </div>
        <div
          className="success-pending p-4 mt-3 position-relative"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            backgroundColor: "rgba(255, 193, 7, 0.12)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="position-absolute" style={{ left: "40px" }}>
              <Image
                src={"/images/logo/shipping.png"}
                width={150}
                height={200}
                alt="shipping"
              />
            </div>
            <div className="ms-auto">
              <h3 style={{ color: "#B78103", textAlign: "center" }}>
                ĐƠN HÀNG ĐANG XỬ LÝ
              </h3>
              <p style={{ color: "#637381" }}>
                CellphoneS sẽ gửi thông tin cập nhật đơn hàng tới bạn
              </p>
            </div>
          </div>
        </div>
        <h4 className="mt-5">THÔNG TIN ĐƠN HÀNG</h4>
        <div
          className="success-info p-4 mt-3"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            overflow: "hidden",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-between pb-2"
            style={{ borderBottom: "1px solid rgba(145, 158, 171, .239)" }}
          >
            <p style={{ color: "#7c8691", fontWeight: "700" }}>Mã đơn hàng</p>
            <p style={{ color: "#000", fontWeight: "700" }}>
              {order_code ?? "Không có mã đơn hàng"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>
              Số lượng sản phẩm
            </p>
            <p style={{ color: "#000", fontWeight: "700" }}>
              {quantity ?? "Không có số lượng"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>
              Tổng tiền (đã bao gồm VAT)
            </p>
            <p style={{ color: "#000", fontWeight: "700" }}>
              {formatMoney(total_price) ?? "Không có tổng tiền"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>
              Phương thức thanh toán
            </p>
            <p style={{ fontWeight: "500" }}>
              {payment_method ?? "Không có phương thức thanh toán"}
            </p>
          </div>
          <div
            className="d-flex align-items-center justify-content-between pt-2"
            style={{ borderTop: "1px solid rgba(145, 158, 171, .239)" }}
          >
            <p style={{ color: "#000", fontWeight: "700" }}>Cần thanh toán</p>
            <p style={{ color: "#D70018", fontWeight: "700" }}>
              {formatMoney(total_price) ?? "Không có số tiền cần thanh toán"}
            </p>
          </div>
        </div>
        <h4 className="mt-4">THÔNG TIN NHẬN HÀNG</h4>
        <div
          className="success-info p-4 mt-3"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            overflow: "hidden",
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>Khách hàng</p>
            <p style={{ color: "#000", fontWeight: "500" }}>
              {recipient_name ?? "Không có thông tin khách hàng"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between my-3">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>Số điện thoại</p>
            <p style={{ color: "#000", fontWeight: "500" }}>
              {recipient_phone ?? "Chưa có số điện thoại"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>Email</p>
            <p style={{ color: "#000", fontWeight: "500" }}>
              {recipient_email ?? "Chưa có email"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>Nhận hàng tại</p>
            <p style={{ color: "#000", fontWeight: "500" }}>
              {shipping_address ?? "Chưa có địa chỉ"}
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between ">
            <p style={{ color: "#7c8691", fontWeight: "700" }}>Người nhận</p>
            <p style={{ color: "#000", fontWeight: "500" }}>{`${
              recipient_name ?? "Không có thông tin"
            } - ${recipient_phone ?? "Chưa có số điện thoại"}`}</p>
          </div>
        </div>
        <h4 className="mt-4">DANH SÁCH SẢN PHẨM</h4>
        <div
          className="order-success-list mt-4 overflow-hidden"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            padding: "12px",
            border: "1px solid rgba(145, 158, 171, .239)",
          }}
        >
          {order_details?.map((item) => {
            return (
              <article
                className="order-success-item d-flex align-items-starts"
                key={item.id}
              >
                <div className="mx-3">
                  <Image
                    src={item?.url_image}
                    width={"110"}
                    height={"110"}
                    alt="cart-product"
                  />
                </div>
                <div className="mt-4 w-100">
                  <h3 style={{ fontSize: "16px" }}>{item?.product_name}</h3>
                  <div className="d-flex justify-content-between align-content-center mt-3">
                    <p
                      style={{
                        color: "red",
                        fontWeight: "500",
                        display: "inline-block",
                      }}
                    >
                      {formatMoney(item?.price)}
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
        <div
          className="success-button d-flex align-items-center gap-3 p-3 mt-3"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            overflow: "hidden",
          }}
        >
          <Link
            href="/"
            style={{
              flex: "1",
              backgroundColor: "transparent",
              padding: "10px",
              border: "1px solid #D70018",
              borderRadius: "5px",
              color: "#D70018",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Tiếp tục mua hàng
          </Link>
          <Link
            href="/"
            style={{
              flex: "1",
              backgroundColor: "#D70018",
              padding: "10px",
              borderRadius: "5px",
              color: "#fff",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Kiểm tra đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageSuccess;
