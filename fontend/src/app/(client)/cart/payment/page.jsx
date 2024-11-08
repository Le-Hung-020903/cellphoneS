"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../css/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "../../../Utils/formatMoney";
import { getCartProducts } from "../../../../redux/middlewares/getCartMiddlewares";
import { cartPrice, getQuantity } from "../../../../redux/slice/getCartSlice";
import toast from "react-hot-toast";
const PagePayment = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const api = `http://localhost:3000/api/v1/order`;
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const paymentInfo = useSelector((state) => state.getLocation.recipient_info);
  const total = useSelector((state) => state.getCart.price);
  const quantity = useSelector((state) => state.getCart.quantity);
  const cart = useSelector((state) => state.getCart.products);
  const [paymentMethod, setPaymentMethod] = useState(
    "Chọn phương thức thanh toán"
  );
  const {
    recipient_email,
    recipient_phone,
    recipient_name,
    notes,
    shipping_address,
  } = paymentInfo;
  const cartList = cart?.cart_products?.map((item) => {
    const quantity = item.quantity;
    const discountAmount = 0;
    return {
      productId: item.product_id,
      discountAmount,
      price: item.unit_price,
      productName: item.product.name,
      quantity,
    };
  });

  const handleOrder = async () => {
    const data = {
      order_status: "pending",
      shipping_fee: 0,
      recipient_email,
      recipient_phone,
      recipient_name,
      notes,
      shipping_address,
      payment_method: paymentMethod,
      cartList,
    };

    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (
        result.status === 200 &&
        result.message === "Order created successfully"
      ) {
        console.log(`thành công tạo đơn hàng`);
        console.log(result);
      } else {
        console.log(result);

        throw new Error("Unable to create order");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleOpenPayment = () => {
    setIsOpenPayment(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePayment = () => {
    setIsOpenPayment(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    dispatch(getCartProducts());
    dispatch(cartPrice());
    dispatch(getQuantity());
  }, [dispatch]);

  return (
    <div
      className="payment-wrapper"
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
          className="payment-title position-relative pb-2"
          style={{ borderBottom: "1px solid #e5e5e5" }}
        >
          <Link href={"/cart/payment-info"}>
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
          <h2 className="text-center fs-4">Thanh Toán</h2>
        </div>
        <div className="payment-nav d-flex align-items-center gap-5">
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
            1. THÔNG TIN
          </div>
          <div
            className={`payment-info-item ${
              pathname === "/cart/payment" ? "active" : ""
            }   pb-2 pt-3`}
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
          className="payment-total p-4 mt-3"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            overflow: "hidden",
          }}
        >
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "#7c8691", fontWeight: "400" }}>
                Số lượng sản phẩm
              </p>
              <p style={{ color: "#212b36" }}>{`0${quantity ?? ""}`}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "#7c8691", fontWeight: "400" }}>
                Tiền hàng (tạm tính)
              </p>
              <p style={{ color: "#212b36" }}>{formatMoney(total)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ color: "#7c8691", fontWeight: "400" }}>
                Phí vận chuyển
              </p>
              <p style={{ color: "#212b36" }}>Miễn phí</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-content-center">
            <p style={{ color: "#7c8691", fontWeight: "400" }}>
              <span style={{ color: "#111", fontWeight: "600" }}>
                Tổng tiền
              </span>
              (đã gồm VAT)
            </p>
            <p style={{ color: "#111", fontWeight: "600" }}>
              {formatMoney(total)}
            </p>
          </div>
        </div>
        <p className="mt-3">THÔNG TIN THANH TOÁN</p>
        <div className="payment-total" onClick={handleOpenPayment}>
          <div
            className="p-4 mt-3 d-flex justify-content-between"
            style={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid rgba(145, 158, 171, .239)",
              cursor: "pointer",
            }}
          >
            <p>{paymentMethod}</p>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                width: "25px",
                height: "25px",
                cursor: "pointer",
                color: "red",
                rotate: "180deg",
              }}
            />
          </div>
          {isOpenPayment && (
            <>
              <div
                className={`overlay ${isOpenPayment ? "" : "d-none"}`}
                onClick={handleClosePayment}
              ></div>
              <div
                className={`payment-options position-fixed ${
                  isOpenPayment ? "" : "d-none"
                }`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "600px",
                  height: "500px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: "20px",
                  zIndex: "999",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Chọn phương thức thanh toán
                  </p>

                  <span
                    style={{ fontSize: "27px", cursor: "pointer" }}
                    onClick={handleClosePayment}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </div>
                <div className="mt-4 d-flex flex-column gap-3">
                  <div
                    className={`payment-option-item ${
                      paymentMethod === "Thanh toán khi nhận hàng"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="recipient"
                      value={`Thanh toán khi nhận hàng`}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ appearance: "none" }}
                    />
                    <label
                      htmlFor="recipient"
                      className="w-100"
                      style={{ padding: "15px 10px", cursor: "pointer" }}
                    >
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                  <div
                    className={`payment-option-item ${
                      paymentMethod === "Chuyển khoản ngân hàng qua mã QR"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="banking"
                      value={`Chuyển khoản ngân hàng qua mã QR`}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ appearance: "none" }}
                    />
                    <label
                      htmlFor="banking"
                      className="w-100"
                      style={{ padding: "15px 10px", cursor: "pointer" }}
                    >
                      Chuyển khoản ngân hàng qua mã QR
                    </label>
                  </div>
                </div>
                <button
                  className={`w-100 d-block p-2 rounded-3 ${
                    paymentMethod !== "Chọn phương thức thanh toán"
                      ? "active"
                      : ""
                  }`}
                  style={{
                    backgroundColor: "#e8e8e8",
                    border: "none",
                    color: "#555",
                    cursor: "not-allowed",
                  }}
                  onClick={handleClosePayment}
                >
                  Xác nhận
                </button>
              </div>
            </>
          )}
        </div>
        <p className="mt-3">THÔNG TIN NHẬN HÀNG</p>
        <div
          className="payment-total p-4 mt-3"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid rgba(145, 158, 171, .239)",
            overflow: "hidden",
          }}
        >
          <div className="d-flex justify-content-between align-content-center">
            <p style={{ color: "#7c8691", fontWeight: "400" }}>Khách hàng</p>
            <p
              style={{
                color: "#111",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {paymentInfo.recipient_name ?? "Khách hàng"}
            </p>
          </div>
          <div className="d-flex justify-content-between align-content-center">
            <p style={{ color: "#7c8691", fontWeight: "400" }}>Số điện thoại</p>
            <p style={{ color: "#111", fontWeight: "600" }}>
              {paymentInfo.recipient_phone}
            </p>
          </div>
          <div className="d-flex justify-content-between align-content-center">
            <p style={{ color: "#7c8691", fontWeight: "400" }}>Email</p>
            <p style={{ color: "#111", fontWeight: "600" }}>
              {paymentInfo.recipient_email}
            </p>
          </div>
          <div className="d-flex justify-content-between align-content-center gap-3">
            <p style={{ color: "#7c8691", fontWeight: "400" }}>Nhận hàng tại</p>
            <p
              style={{
                color: "#111",
                fontWeight: "600",
                textAlign: "right",
                fontSize: "15px",
              }}
            >
              {paymentInfo.shipping_address}
            </p>
          </div>
          <div className="d-flex justify-content-between align-content-center">
            <p style={{ color: "#7c8691", fontWeight: "400" }}>Người nhận</p>
            <p style={{ color: "#111", fontWeight: "600" }}>
              {`${paymentInfo.recipient_name} - ${paymentInfo.recipient_phone}`}
            </p>
          </div>
          {paymentInfo.notes && (
            <div className="d-flex justify-content-between align-content-center">
              <p style={{ color: "#7c8691", fontWeight: "400" }}>Ghi chú</p>
              <p style={{ color: "#111", fontWeight: "600" }}>
                {paymentInfo.notes}
              </p>
            </div>
          )}
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
          <Link
            href={"/cart/success"}
            className=" d-block text-center rounded-1 p-2 mt-2"
            onClick={handleOrder}
            style={{
              backgroundColor: "#D70018",
              color: "white",
              textDecoration: "none",
            }}
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagePayment;
