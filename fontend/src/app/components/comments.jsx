"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "../(client)/css/comment.css";

const Comments = () => {
  return (
    <div className="comment-wrapper row p-2">
      <div className="comment-wrapper__inner bg-white col-lg-9 col-md-12 p-4 overflow-hidden">
        <h4 className="comment-title mt-2">Hỏi và đáp</h4>
        <div className="comment-post row p-1 gx-2">
          <div className="comment-post__inner  d-flex gap-4 col-10">
            <div className="comment-post__logo">
              <Image
                alt="logo comment"
                width={80}
                height={150}
                src={"/images/logo/mascot.jpg"}
                className="object-fit-contain"
              />
            </div>
            <div className="comment-post__content d-inline-block w-100 mt-3">
              <textarea
                name=""
                id=""
                style={{
                  resize: "none",
                  height: "150px",
                  width: "100%",
                  outline: "none",
                  border: "none",
                }}
                placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
              ></textarea>
            </div>
          </div>
          <button
            className="ms-auto comment-post__send rounded col-2 text-white"
            style={{
              width: "70px",
              height: "50px",
              backgroundColor: "#D70018",
            }}
          >
            SEND
          </button>
        </div>
        <div className="comment-answer">
          <div className="comment-reply mt-3 pt-4 border-top  position-relative">
            <div className="comment-reply__top d-flex justify-content-between align-items-center">
              <div className="comment-reply__avatar d-flex">
                T<p className="comment-reply-name ms-3">Hung</p>
              </div>
              <p className="comment-reply__time">57 phút trước</p>
            </div>
            <p className="comment-asked pt-3 pb-4 px-3 mb-0">
              Đến đầu tháng 8 còn hàng ip 11 ở khu vực bình dương không ạ?
            </p>
            <button
              className="button-reply position-absolute bg-transparent text-danger fw-bold"
              style={{ bottom: "8%", right: "2%" }}
            >
              Trả lời
            </button>
          </div>
          <div className="comment-like">
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{ width: "20px", cursor: "pointer", marginTop: "20px" }}
            />
          </div>
        </div>
        <div className="comment-answer">
          <div className="comment-reply mt-3 pt-4 border-top  position-relative">
            <div className="comment-reply__top d-flex justify-content-between align-items-center">
              <div className="comment-reply__avatar d-flex">
                T<p className="comment-reply-name ms-3">Hung</p>
              </div>
              <p className="comment-reply__time">57 phút trước</p>
            </div>
            <p className="comment-asked pt-3 pb-4 px-3 mb-0">
              Đến đầu tháng 8 còn hàng ip 11 ở khu vực bình dương không ạ?
            </p>
            <button
              className="button-reply position-absolute bg-transparent text-danger fw-bold"
              style={{ bottom: "8%", right: "2%" }}
            >
              Trả lời
            </button>
          </div>
          <div className="comment-like">
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{
                width: "20px",
                cursor: "pointer",
                color: "#D70018",
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
