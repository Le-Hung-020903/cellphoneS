import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../../../css/smember.css";
const PageSupport = () => {
  return (
    <div className="container">
      <div className="support-wrapper">
        <div className="support-list row g-3">
          <div className="col-6 ">
            <div className="support-item">
              <div>
                <Image
                  width={100}
                  height={100}
                  src="/images/icon/earphone.png"
                  alt="earphone"
                />
              </div>
              <div>
                <p className="mb-0">Tư vấn mua hàng (8h00 - 22h00)</p>
                <Link href="tel:0383545843" className="support-item-link">
                  0383.545.843
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="support-item">
              <div className="ps-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/icon/o'clock.png"
                  alt="earphone"
                />
              </div>
              <div>
                <p className="mb-0">Bảo hành (8h00 - 21h00)</p>
                <Link href="tel:0383545843" className="support-item-link">
                  0383.545.843
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="support-item">
              <div className="ps-2">
                <Image
                  width={100}
                  height={100}
                  src="/images/icon/complaints.jpg"
                  alt="earphone"
                />
              </div>
              <div>
                <p className="mb-0">Khiếu nại (8h00 - 21h30)</p>
                <Link href="tel:0383545843" className="support-item-link">
                  0383.545.843
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="support-item">
              <div className="ps-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/icon/email.png"
                  alt="earphone"
                />
              </div>
              <div>
                <p className="mb-0">Email</p>
                <Link
                  href="mailto: lehung020903@gmail.com"
                  className="support-item-link"
                >
                  lehung020903@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSupport;
