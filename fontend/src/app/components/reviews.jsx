import React from "react";
import { FaStar } from "react-icons/fa6";
import "../(client)/css/reviews.css";
const Reviews = (props) => {
  const { product } = props;
  return (
    <div className="reviews-wrapper p-4">
      <h4>Đánh giá & nhận xét {product.name}</h4>
      <div className="review-star row pb-3 border-bottom border-secondary">
        <div className="review-quality col-5 p-2 border-end border-secondary d-flex flex-column align-items-center justify-content-center">
          <p className="review-quality__point">5.0/5</p>
          <div className="review-quality__star d-flex justify-content-between w-25 mb-3">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="review-quality__comment">2 đánh giá</p>
        </div>
        <div className="review-quantity col-7 p-2">
          <div className="review-five-star d-flex justify-content-evenly">
            <div className="review-star">
              5
              <FaStar className="ms-1" />
            </div>
            <p className="review-comment">2 đánh giá</p>
          </div>
          <div className="review-four-star d-flex justify-content-evenly">
            <div className="review-star">
              5
              <FaStar className="ms-1" />
            </div>
            <p className="review-comment d-flex justify-content-evenly">
              2 đánh giá
            </p>
          </div>
          <div className="review-three-star d-flex justify-content-evenly">
            <div className="review-star">
              5
              <FaStar className="ms-1" />
            </div>
            <p className="review-comment">2 đánh giá</p>
          </div>
          <div className="review-two-star d-flex justify-content-evenly">
            <div className="review-star">
              5
              <FaStar className="ms-1" />
            </div>
            <p className="review-comment d-flex justify-content-evenly">
              2 đánh giá
            </p>
          </div>
          <div className="review-one-star d-flex justify-content-evenly">
            <div className="review-star">
              5
              <FaStar className="ms-1" />
            </div>
            <p className="review-comment">2 đánh giá</p>
          </div>
        </div>
      </div>
      <div className="filter-star">
        <h4 className="filter-star-title">Lọc theo</h4>
        <div className="filter-star-row d-flex w-50 justify-content-between align-items-center">
          <button
            className="five-star active d-flex gap-1 align-items-center bg-transparent border border-secondary py-1 px-3"
            style={{ borderRadius: "50px" }}
          >
            5
            <FaStar className="ms-1" style={{ color: "yellow" }} />
          </button>
          <button
            className="four-star d-flex gap-1 align-items-center bg-transparent  border border-secondary py-1 px-3"
            style={{ borderRadius: "50px" }}
          >
            4
            <FaStar className="ms-1" style={{ color: "yellow" }} />
          </button>
          <button
            className="three-star d-flex gap-1 align-items-center bg-transparent  border border-secondary py-1 px-3"
            style={{ borderRadius: "50px" }}
          >
            3
            <FaStar className="ms-1" style={{ color: "yellow" }} />
          </button>
          <button
            className="two-star d-flex gap-1 align-items-center bg-transparent  border border-secondary py-1 px-3"
            style={{ borderRadius: "50px" }}
          >
            2
            <FaStar className="ms-1" style={{ color: "yellow" }} />
          </button>
          <button
            className="one-star d-flex gap-1 align-items-center bg-transparent  border border-secondary py-1 px-3"
            style={{ borderRadius: "50px" }}
          >
            1
            <FaStar className="ms-1" style={{ color: "yellow" }} />
          </button>
        </div>
      </div>
      <div className="review-content mt-5">
        <div className="review-content-user d-flex gap-3 pb-4 mt-3 border-bottom border-secondary">
          <div className="review-avatar rounded-circle">T</div>
          <div className="review-content__inner">
            <div className="review-content__header d-flex gap-4 align-items-center">
              <p className="review-name fw-bold mb-0">Lê đình hùng</p>
              <p
                className="review-content__time mb-0"
                style={{ color: "#707070", fontSize: "13px" }}
              >
                11/10/2023 14:49
              </p>
            </div>
            <div
              className="review-content__body mt-2"
              style={{ color: "yellow" }}
            >
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p
              className="review-content__footer mt-2 mb-0"
              style={{ color: "#4A4A4A", fontWeight: 500, fontSize: "14px" }}
            >
              Nghiệp vụ nhân viên bán hàng rất tôt
            </p>
          </div>
        </div>
        <div className="review-content-user d-flex gap-3 pb-4 mt-3 border-bottom border-secondary">
          <div className="review-avatar rounded-circle">T</div>
          <div className="review-content__inner">
            <div className="review-content__header d-flex gap-4 align-items-center">
              <p className="review-name fw-bold mb-0">Lê đình hùng</p>
              <p
                className="review-content__time mb-0"
                style={{ color: "#707070", fontSize: "13px" }}
              >
                11/10/2023 14:49
              </p>
            </div>
            <div
              className="review-content__body mt-2"
              style={{ color: "yellow" }}
            >
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p
              className="review-content__footer mt-2 mb-0"
              style={{ color: "#4A4A4A", fontWeight: 500, fontSize: "14px" }}
            >
              Nghiệp vụ nhân viên bán hàng rất tôt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
