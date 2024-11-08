"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import "../../css/smember.css";
import { formatMoney } from "../../../Utils/formatMoney";
import { convert } from "../../../Utils/convertDay";
import { getFavoriteProducts } from "../../../../redux/middlewares/getFavoriteMiddleware";
import { getQuantityOrder } from "../../../../redux/middlewares/getQuantityOrder";
import Link from "next/link";
const PageOrder = () => {
  const dispatch = useDispatch();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());
  const quantity = useSelector((state) => state.getQuantityOrder.quantity);
  const { data, isLoading, error } = useSWR(`${api}/api/v1/orders`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  useEffect(() => {
    dispatch(getFavoriteProducts());
    dispatch(getQuantityOrder());
  }, [dispatch]);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }

  return (
    <div className="container">
      <div className="history">
        <div className="smember-profile d-flex gap-3">
          <Image
            src={"/images/logo/avatar.jpg"}
            width={80}
            height={80}
            alt="smember-profile"
          />
          <div>
            <p style={{ textTransform: "uppercase", marginBottom: "0px" }}>
              hungg dinh le
            </p>
            <p className="mt-1">0383545843</p>
          </div>
        </div>
        <div
          className="smember-order mt-4 bg-white d-inline-block rounded-3"
          style={{ width: "100%", padding: "40px 0" }}
        >
          <div className="d-flex">
            <div
              style={{
                flex: "1",
                textAlign: "center",
                borderRight: "1px solid black",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginBottom: "5px",
                }}
              >
                {quantity ?? 0}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              >
                đơn hàng
              </span>
            </div>
            <div style={{ flex: "1", textAlign: "center" }}>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginBottom: "5px",
                }}
              >
                0đ
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "13px",
                  paddingTop: "10px",
                }}
              >
                Tổng tiền tích luỹ
              </span>
            </div>
          </div>
        </div>
        <div className="history-nav mt-5 d-flex gap-4">
          <div className="history-item history-item-active">
            <p>Tât cả</p>
          </div>
          <div className="history-item">
            <p>Chờ xác nhận</p>
          </div>
          <div className="history-item">
            <p>Đã xác nhận</p>
          </div>
          <div className="history-item">
            <p>Đang vận chuyển</p>
          </div>
          <div className="history-item">
            <p>Đã giao hàng</p>
          </div>
          <div className="history-item">
            <p>Đã huỷ</p>
          </div>
        </div>
        <div className="history-product-list mt-3 ">
          {data?.data?.map((item) => {
            return (
              <article
                className="history-product-item p-3 bg-white  rounded-3"
                key={item.order_id}
              >
                <div className="d-flex gap-4">
                  <div className="history-image">
                    <Image
                      src={`${item.order_detail.url_image}`}
                      width={130}
                      height={130}
                      alt={`${item.order_detail.product_name}`}
                    />
                  </div>
                  <div
                    className="history-information d-flex flex-column"
                    style={{ flex: "1" }}
                  >
                    <div className="history-detail-top w-full d-flex align-items-center justify-content-between">
                      <p style={{ color: "#4a4a4a", fontSize: "17px" }}>
                        {`${item.order_detail.product_name}`}
                      </p>
                      <p style={{ color: "#999", fontSize: "15px" }}>
                        {`${convert(item.created_at)}`}
                      </p>
                    </div>
                    {item.order_detail.additional_products && (
                      <p
                        className="history-subtitle"
                        style={{
                          color: "#8a8a8a",
                          fontSize: "12px",
                        }}
                      >
                        {item.order_detail.additional_products}
                      </p>
                    )}
                    <div
                      className="history-status"
                      style={{ backgroundColor: "#dfe3e8", color: "#717171" }}
                    >
                      Đã huỷ
                    </div>
                    <div className="history-detail-bottom d-flex align-items-center justify-content-between mt-5">
                      <p
                        className="history-price"
                        style={{ color: "#fd2424", fontWeight: "700" }}
                      >
                        {`${formatMoney(item.order_detail.price) ?? `0đ`}`}
                      </p>
                      <Link
                        href={`/smember/order/${item.order_id}`}
                        className="history-btn"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageOrder;
