"use client";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import "../css/cart.css";
import { formatMoney } from "../../Utils/formatMoney";
import { cartPrice } from "../../../redux/slice/getCartSlice";
import { getCartProducts } from "../../../redux/middlewares/getCartMiddlewares";
import { deleteCart } from "../../../redux/middlewares/deleteCartMiddleware";
import { addCartProducts } from "../../../redux/middlewares/addCartMiddleware";

const PageCart = () => {
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();
  const getCarts = useSelector((state) => state.getCart.products);
  const message = useSelector((state) => state.deleteCart.message);
  const total = useSelector((state) => state.getCart.price);

  const deleteCartProduct = (id, name) => {
    // Hiển thị popup xác nhận
    Swal.fire({
      title: "Bạn có chắc chắn muốn xoá sản phẩm này ?",
      text: `${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Gọi API xóa sản phẩm
          await dispatch(deleteCart({ id })).unwrap();

          // Xoá localStorage vì giỏ hàng đã thay đổi
          // localStorage.removeItem("data");

          // // Lấy lại giỏ hàng sau khi cập nhật
          // const updatedCart = await dispatch(getCartProducts()).unwrap();

          // // Lưu giỏ hàng mới vào localStorage
          // localStorage.setItem("data", JSON.stringify(updatedCart));
        } catch (e) {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: `Xóa sản phẩm thất bại: ${e.message}`,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleIncrement = (idProduct) => {
    let updatedQuantity;
    let id = +idProduct;
    setQuantity((prevQuantity) => {
      if (prevQuantity[id] < 3) {
        updatedQuantity = { ...prevQuantity, [id]: prevQuantity[id] + 1 };
        return updatedQuantity;
      } else {
        Swal.fire({
          title: "Thông báo",
          text: "Số lượng sản phẩm đã đạt mức tối đa!",
          icon: "info",
          confirmButtonText: "OK",
        });
        return prevQuantity;
      }
    });

    try {
      dispatch(
        addCartProducts({ product_id: id, quantity: updatedQuantity[id] })
      );
      dispatch(cartPrice());
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: `${e.message}`,
        text: "Thêm sản phẩm bị lỗi, vui lòng thử lại",
        timer: 1500,
      });
    }
  };

  const handleDecrement = (idProduct) => {
    let updatedQuantity;
    let id = +idProduct;
    setQuantity((prevQuantity) => {
      if (prevQuantity[id] > 1) {
        updatedQuantity = { ...prevQuantity, [id]: prevQuantity[id] - 1 };
        return updatedQuantity;
      } else {
        Swal.fire({
          title: "Thông báo",
          text: "Số lượng sản phẩm đã giảm đến mức tối thiểu!",
          icon: "info",
          confirmButtonText: "OK",
        });
        return prevQuantity;
      }
    });
    try {
      dispatch(
        addCartProducts({ product_id: id, quantity: updatedQuantity[id] })
      );
      dispatch(cartPrice());
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: `${e.message}`,
        text: "Giảm sản phẩm bị lỗi, vui lòng thử lại",
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    if (getCarts?.cart_products) {
      const initialState = {};
      getCarts.cart_products.forEach((item) => {
        // Gán đúng số lượng sản phẩm từ server cho mỗi sản phẩm
        initialState[item.product_id] = item.quantity;
      });
      // Đặt state quantity dựa trên dữ liệu từ server
      setQuantity(initialState);
    }
    // Tính tổng giá trị của giỏ hàng
    dispatch(cartPrice());
  }, [getCarts, dispatch]);

  useEffect(() => {
    if (message === "Delete successfully") {
      Swal.fire({
        title: "Đã xoá thành công",
        icon: "success",
      });
      dispatch(getCartProducts());
    }
  }, [message, dispatch]);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <div
      className="cart-wrapper"
      style={{ backgroundColor: "#f2f2f2", height: "100vh" }}
    >
      <div
        className="mx-auto"
        style={{
          marginTop: "70px",
          width: "40%",
        }}
      >
        <div className="cart-title position-relative pb-2 border-bottom border-secondary">
          <Link href={"/"}>
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
          <h2 className="text-center fs-4">Giỏ hàng của bạn</h2>
        </div>

        <div
          className="cart-body mt-4 overflow-hidden"
          style={{
            borderRadius: "8px",
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid rgba(145, 158, 171, .239)",
          }}
        >
          <div className="cart-list">
            {getCarts?.cart_products && getCarts.cart_products.length !== 0 ? (
              <>
                {getCarts?.cart_products?.map((item) => {
                  const productQuantity = quantity[item.product_id];
                  return (
                    <article
                      className="cart-item d-flex gap-4 align-items-start mb-3"
                      key={item.id}
                    >
                      <div className="product-img">
                        <Image
                          src={item?.product?.Products_images[0]?.url_image}
                          alt="product cart"
                          width={150}
                          height={160}
                        />
                      </div>
                      <div className="product-info w-100">
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <p className="product-name mb-0 ">
                            {item?.product?.name}
                          </p>
                          <FaRegTrashAlt
                            style={{
                              cursor: "pointer",
                              display: "inline-block",
                            }}
                            onClick={() =>
                              deleteCartProduct(item?.id, item?.product?.name)
                            }
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4">
                          <div className="product-price d-flex align-items-center mt-2">
                            <p className="product-price__show text-danger fs-5">
                              {formatMoney(item?.unit_price)}
                            </p>
                            <p
                              className="product-price__through ms-3 text-decoration-line-through"
                              style={{ color: "#707070" }}
                            >
                              10.890.000đ
                            </p>
                          </div>
                          <div className="product-action d-flex">
                            <button
                              className="d-flex justify-content-center align-content-center text-black border-0"
                              onClick={() => {
                                handleDecrement(item.product_id);
                              }}
                              style={{
                                width: "30px",
                                height: "30px",
                                backgroundColor: "#f3f3f3",
                                cursor: "pointer",
                                fontSize: "20px",
                                borderRadius: "3px",
                              }}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={productQuantity}
                              name=""
                              onChange={(e) => setQuantity(e.target.value)}
                              id=""
                              readOnly
                              className="d-inline-block border-0 text-center"
                              style={{ width: "50px" }}
                            />
                            <button
                              className="d-flex align-content-center justify-content-center text-black border-0"
                              onClick={() => handleIncrement(item.product_id)}
                              style={{
                                width: "30px",
                                height: "30px",
                                fontSize: "20px",
                                backgroundColor: "#f3f3f3",
                                cursor: "pointer",
                                borderRadius: "3px",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
                <div
                  className="cart-footer d-flex justify-content-between p-2 bg-danger mt-2 rounded"
                  style={{
                    width: "100%",
                  }}
                >
                  <p className="h6" style={{ color: "white" }}>
                    Tạm tính: {formatMoney(total)}
                  </p>
                  <Link
                    href={"/cart/payment-info"}
                    className="border-0"
                    style={{
                      backgroundColor: "#d70018",
                      borderRadius: "5px",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 20px",
                    }}
                  >
                    Mua ngay
                  </Link>
                </div>
              </>
            ) : (
              <div className="nothing-in-cart">
                <div>
                  <div
                    className="d-flex justify-content-center align-items-start mt-2 mx-3"
                    style={{ minHeight: "500px" }}
                  >
                    <Image
                      src={"/images/cart/cart.jpg"}
                      width={1000}
                      height={400}
                      className="object-fit-cover h-25 w-75"
                      alt="nothing in cart"
                    />
                  </div>
                  <p className="text-center h5">
                    Giỏ hàng của bạn đang trống. <br /> Hãy chọn thêm sản phẩm
                    để mua sắm nhé
                  </p>
                </div>
                <div
                  className="bg-danger mt-5 h5 rounded-1"
                  style={{ cursor: "pointer" }}
                >
                  <Link
                    href={"/"}
                    className="d-inline-block p-2  text-decoration-none text-center"
                    style={{ color: "white", width: "100%" }}
                  >
                    Quay lại trang chủ
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCart;
