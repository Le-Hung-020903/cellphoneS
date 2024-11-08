import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
const PageFeedback = () => {
  return (
    <div className="container">
      <div className="feedback-wrapper">
        <div className="d-flex align-items-center gap-3">
          <Link href={"/smember/account/support"}>
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
          <h5 className="mb-0">GÓP Ý VÀ PHẢN HỒI</h5>
        </div>
        <div className="w-75 mx-auto">
          <div className="d-flex mt-5 align-items-center gap-3">
            <div>
              <Image
                width={250}
                height={250}
                src={"/images/thankyou-customer/thankyou.png"}
                alt="Thankyou"
              />
            </div>
            <p>
              Mời bạn đánh giá mức độ hài lòng về chương trình ưu đãi cửa hàng
              của chúng tôi. Hãy cho chúng mình thêm góp ý để cải thiện tốt hơn
            </p>
          </div>
          <div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScygdvKRl7FQt7F-TSmTx2pqIKMaE3XqTd3sEtiwbjt_rzC9A/viewform"
              style={{ borderRadius: "10px", margin: "30px 0" }}
              width="100%"
              height="500px"
              title="Google Docs Viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFeedback;
