"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CiUser } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faXmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FaCameraRetro } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import toast from "react-hot-toast";
import "../../../css/smember.css";
import { storage } from "../../../../Utils/firebase";
import { convert } from "../../../../Utils/convertDay";
import { formatMoney } from "../../../../Utils/formatMoney";
const PageOrderDetail = ({ params }) => {
  const id = params.id;
  const api = process.env.NEXT_PUBLIC_API_URL;
  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${api}/api/v1/order/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [openReview, setOpenReview] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectImage, setSelectImage] = useState([]);
  const [reviewContent, setReviewContent] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setSelectImage((pre) => [...pre, ...imagesUrls]);
  };

  const handleDeleteImage = (imageUrl) => {
    URL.revokeObjectURL(imageUrl);
    setSelectImage((pre) => pre.filter((img) => img.url !== imageUrl.url));
  };

  // function upload images to firebase
  const handleUploadFile = async () => {
    if (!selectImage || selectImage.length === 0) return;
    const urlImages = [];
    for (let i = 0; i < selectImage.length; i++) {
      const file = selectImage[i].file;
      const imgRef = ref(
        storage,
        `image_product_review/${file.name + uuidv4()}`
      );
      try {
        // Upload file lên Firebase Storage
        await uploadBytes(imgRef, file);

        // Lấy URL tải xuống của file đã upload
        const urlImg = await getDownloadURL(imgRef);
        urlImages.push(urlImg);
      } catch (e) {
        toast.error(`Error uploading or retrieving URL: ${e.message}`);
      }
    }
    return urlImages;
  };

  const handleProductReview = async (productId, orderId, orderStatus) => {
    if (reviewContent.length < 40) {
      toast.error("Review content must be at least 40 characters long");
      return;
    }
    const images = await handleUploadFile();
    const values = {
      product_id: productId,
      order_id: orderId,
      star: rating,
      review_content: reviewContent,
      verified_purchase: orderStatus,
      url_image: JSON.stringify(images),
    };
    try {
      const response = await fetch(`${api}/api/v1/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await response.json();
      if (
        data.status === 200 &&
        data.message === "Product review created successfully"
      ) {
        toast.success("Successful product reviews");
        setReviewContent("");
        setSelectImage([]);
      } else {
        throw new Error("Failed to create product reviews");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }
  return (
    <div className="container">
      <div className="order-detail w-full">
        <div className="order-detail-top">
          <div className="d-flex gap-3 align-items-center">
            <Link href={"/smember/order"}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  color: "black",
                  color: "#DBDDDF",
                }}
              />
            </Link>
            <h4>Chi tiết đơn hàng</h4>
          </div>
          <div className="d-flex mt-3 w-full justify-content-between align-items-center">
            <p className="mb-0">
              Mã đơn hàng: <strong>{data?.data?.order_code}</strong>
            </p>
            <p className="mb-0">Đã huỷ</p>
          </div>
          <p className="mt-2">
            {convert(data?.data?.created_at || "Chưa cập nhật")}
          </p>
        </div>
        <div className="order-detail-list rounded-3 overflow-hidden">
          {data?.data?.detail_order?.map((item) => {
            return (
              <article
                className="order-detail-item p-3 bg-white"
                key={item?.detail_order_id}
              >
                <div className="d-flex gap-4">
                  <div className="history-image">
                    <Image
                      src={`${item?.url_image}`}
                      width={130}
                      height={130}
                      alt={item?.product_name}
                    />
                  </div>
                  <div
                    className="history-information d-flex flex-column"
                    style={{ flex: "1" }}
                  >
                    <p style={{ color: "#4a4a4a", fontSize: "17px" }}>
                      {item?.product_name}
                    </p>
                    <p className="history-quantity ms-auto">
                      Số lượng:
                      <span
                        style={{
                          color: "rgb(224, 5, 43)",
                          fontWeight: "700",
                          marginLeft: "5px",
                        }}
                      >
                        {item?.quantity}
                      </span>
                    </p>
                    <div className="history-detail-bottom d-flex align-items-center justify-content-end mt-5 gap-3">
                      <button
                        className="history-btn"
                        onClick={() => {
                          setOpenReview(true);
                          setCurrentProduct(item);
                        }}
                      >
                        Đánh giá
                      </button>
                      <button className="history-btn">Mua lại</button>
                    </div>
                  </div>
                  {openReview && (
                    <>
                      <div
                        className={`overlay ${openReview ? "active" : ""}`}
                        onClick={() => setOpenReview(false)}
                      ></div>
                      <div
                        className={`order-detail-reviews ${
                          openReview ? "active" : ""
                        }`}
                      >
                        <div
                          className="review-top d-flex align-items-center justify-content-between w-full"
                          style={{
                            backgroundColor: "#f4f6f8",
                            borderTopLeftRadius: "8px",
                            padding: "9px 14px",
                            borderTopRightRadius: "8px",
                          }}
                        >
                          <h3 className="mb-0">Đánh giá & nhận xét</h3>
                          <span
                            style={{ fontSize: "27px", cursor: "pointer" }}
                            onClick={() => setOpenReview(false)}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="review-name d-flex align-items-center justify-content-evenly mt-3">
                            <div>
                              <Image
                                src={"/images/icon/icon-review-star.jpg"}
                                width={100}
                                height={100}
                                alt="review star"
                              />
                            </div>
                            <p style={{ fontSize: "25px", fontWeight: "600" }}>
                              {currentProduct?.product_name}
                            </p>
                          </div>
                          <div className="review-star-list mt-4 d-flex justify-content-evenly align-items-center">
                            {[1, 2, 3, 4, 5].map((item, index) => {
                              return (
                                // khi điều kiện đúng sẽ có class là is-active
                                <p
                                  className={`review-star-item ${
                                    item <= (hover || rating) ? "is-active" : ""
                                  }`}
                                  onMouseEnter={() => setHover(item)}
                                  onMouseLeave={() => setHover(0)}
                                  onClick={() => setRating(item)}
                                  key={index}
                                >
                                  <span
                                    // Giữ màu default là vàng, nếu không là vàng sẽ là màu xám
                                    style={{
                                      color: `${
                                        item <= (hover || rating)
                                          ? "#ffbf00"
                                          : "#C6CCD3"
                                      }`,
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faStar} />
                                  </span>
                                  {item === 1
                                    ? "Rất tệ"
                                    : item === 2
                                    ? "Tệ"
                                    : item === 3
                                    ? "Bình thường"
                                    : item === 4
                                    ? "Tốt"
                                    : item === 5
                                    ? "Rất tốt"
                                    : ""}
                                </p>
                              );
                            })}
                          </div>
                          <div className="review-content w-full mt-4 px-3">
                            <textarea
                              name=""
                              style={{
                                width: "100%",
                                display: "block",
                                padding: "10px",
                                height: "180px",
                                borderRadius: "10px",
                                borderColor: "#dbdbdb",
                              }}
                              id=""
                              onChange={(e) => setReviewContent(e.target.value)}
                              value={reviewContent}
                              placeholder="Xin mời chia sẻ về một số cảm nhận về sản phẩm"
                            ></textarea>
                          </div>
                          <div className="review-input-img d-flex align-items-center gap-3 p-3">
                            {selectImage &&
                              selectImage?.map((imageUrl, index) => {
                                return (
                                  <div
                                    className="review-img"
                                    style={{
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                    key={index}
                                  >
                                    <Image
                                      src={imageUrl.url}
                                      width={120}
                                      height={90}
                                      alt="review image"
                                    />
                                    <button
                                      onClick={() =>
                                        handleDeleteImage(imageUrl)
                                      }
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        background: "gray",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      x
                                    </button>
                                  </div>
                                );
                              })}
                            <div
                              className="review-input ms-3 mt-3"
                              style={{
                                width: "150px",
                                height: "100px",
                                color: "#637381",
                                border: "1px dashed rgba(145, 158, 171, .239)",
                                cursor: "pointer",
                                borderRadius: "5px",
                              }}
                            >
                              <input
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                id="review-img"
                                multiple="multiple"
                                className="d-none"
                                onChange={handleImageChange}
                              />
                              <label
                                htmlFor="review-img"
                                className=" d-flex flex-column align-items-center gap-2 fw-bolder"
                                style={{ cursor: "pointer" }}
                              >
                                <span style={{ fontSize: "25px" }}>
                                  <FaCameraRetro />
                                </span>
                                Thêm hình ảnh
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className="review-bottom position-fixed rounded-3"
                          style={{
                            backgroundColor: "#d7000e",
                            bottom: "10px",
                            left: "10px",
                            right: "10px",
                            padding: "12px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: "transparent",
                              display: "inline-block",
                              fontWeight: "700",
                              color: "#fff",
                              fontSize: "18px",
                              width: "100%",
                            }}
                            onClick={() =>
                              handleProductReview(
                                item.product_id,
                                data?.data?.order_id,
                                data?.data?.order_status
                              )
                            }
                          >
                            GỬI ĐÁNH GIÁ
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className="order-detail-info mt-3 rounded-3 overflow-hidden bg-white p-4">
          <div className="info-top d-flex align-items-center gap-3">
            <Image
              src={"/images/icon/icon-card.png"}
              width={50}
              height={50}
              alt="info-card"
            />
            <h3 className="mb-0 fs-4">Thông tin thanh toán</h3>
          </div>
          <div className="info-body">
            <div className="d-flex align-items-center justify-content-between">
              <p style={{ color: "#7c8691", fontWeight: "700" }}>
                Tổng tiền sản phẩm:
              </p>
              <p style={{ fontWeight: "500" }}>
                {formatMoney(data?.data?.total_price)}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p style={{ color: "#7c8691", fontWeight: "700" }}>Giảm giá:</p>
              <p style={{ fontWeight: "500" }}>0đ</p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p style={{ color: "#7c8691", fontWeight: "700" }}>
                Phí vận chuyển:
              </p>
              <p style={{ fontWeight: "500" }}>
                {data?.data?.shipping_fee
                  ? formatMoney(data?.data?.shipping_fee)
                  : "0đ"}
              </p>
            </div>
            <div
              className="d-flex align-items-center justify-content-between pt-2"
              style={{ borderTop: "1px solid rgba(145, 158, 171, .239)" }}
            >
              <p style={{ color: "#7c8691", fontWeight: "700" }}>
                Phải thanh toán:
              </p>
              <p style={{ fontWeight: "700", color: "#000" }}>
                {formatMoney(data?.data?.total_price)}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p style={{ color: "#000", fontWeight: "700" }}>
                Còn phải thanh toán:
              </p>
              <p style={{ color: "#D70018", fontWeight: "700" }}>
                {" "}
                {formatMoney(data?.data?.total_price)}
              </p>
            </div>
          </div>
        </div>
        <div className="order-customer mt-3 rounded-3 overflow-hidden bg-white p-4 mb-5">
          <div className="order-customer-top d-flex align-items-center">
            <Image
              src={"/images/icon/icon-customer.png"}
              width={40}
              height={40}
              alt="icon customer"
            />
            <h3 className="mb-0 fs-4">Thông tin khách hàng</h3>
          </div>
          <div className="order-customer-bottom ps-2">
            <div className="d-flex gap-5 align-items-center pt-4">
              <CiUser className="fs-4" />
              <p className="mb-0">{data?.data?.recipient_name}</p>
            </div>
            <div className="d-flex gap-5 align-items-center py-3">
              <CiPhone className="fs-4" />
              <p className="mb-0">{data?.data?.recipient_phone}</p>
            </div>
            <div className="d-flex gap-5 align-items-center">
              <CiLocationOn className="fs-4" />
              <p className="mb-0">{data?.data?.shipping_address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOrderDetail;
