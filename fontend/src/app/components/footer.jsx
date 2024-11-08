import "../(client)/css/footer.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer border-top container py-3">
      <div className="row">
        <div className="col-md-3">
          <h4>Hỗ trợ khách hàng</h4>
          <ul className="footer-list list-unstyled">
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Khách hàng doanh nghiệp (B2B)
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Danh sách cửa hàng
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Mua hàng trả góp
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Tra cứu điểm thành viên
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Tuyển dụng mới nhất
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Hướng dẫn mua hàng Online
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Trung tâm bảo hành Apple tại Việt Nam
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h4>Chính sách</h4>
          <ul className="footer-list list-unstyled">
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Chính sách bảo hành
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Chính sách đổi trả
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Chính sách bán hàng
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Chính sách bảo mật
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Chính sách sử dụng
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                Chính sách kiểm hàng
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h4>Liên hệ</h4>

          <ul className="footer-list list-unstyled">
            <li className="footer-item">
              <a href="#!" className="footer-link">
                <span className="footer-strong">Mua ngay:</span>
                <span className="footer-hotline">1800.6018</span>
                (07:30 – 21:30)
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                <span className="footer-strong">Kỹ thuật:</span>
                <span className="footer-hotline">1800.6729</span>
                (08:30 – 21:30)
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                <span className="footer-strong">Bảo hành:</span>
                <span className="footer-hotline">1800.6729</span>
                (09:00 – 21:00)
              </a>
            </li>
            <li className="footer-item">
              <a href="#!" className="footer-link">
                <span className="footer-strong">Góp ý:</span>
                <span className="footer-hotline"> 1800.6306</span>
                (08:30 – 21:30)
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <h4>Kết nối</h4>
          <div className="row">
            <ul className="footer-socials d-flex justify-content-between list-unstyled">
              <li className="footer-social">
                <a href="" className="footer-social__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <path
                      fill="#FF3D00"
                      d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                    />
                    <path fill="#FFF" d="M20 31L20 17 32 24z" />
                  </svg>
                </a>
              </li>
              <li className="footer-social">
                <a href="" className="footer-social__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <path
                      fill="#3F51B5"
                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                    />
                    <path
                      fill="#FFF"
                      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                    />
                  </svg>
                </a>
              </li>
              <li className="footer-social">
                <a href="" className="footer-social__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8ma"
                      cx="19.38"
                      cy="42.035"
                      r="44.899"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#fd5" />
                      <stop offset=".328" stopColor="#ff543f" />
                      <stop offset=".348" stopColor="#fc5245" />
                      <stop offset=".504" stopColor="#e64771" />
                      <stop offset=".643" stopColor="#d53e91" />
                      <stop offset=".761" stopColor="#cc39a4" />
                      <stop offset=".841" stopColor="#c837ab" />
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    />
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8mb"
                      cx="11.786"
                      cy="5.54"
                      r="29.813"
                      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#4168c9" />
                      <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    />
                    <path
                      fill="#fff"
                      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                    />
                    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                    <path
                      fill="#fff"
                      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                    />
                  </svg>
                </a>
              </li>
              <li className="footer-social">
                <a href="" className="footer-social__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="50px"
                    height="50px"
                  >
                    {" "}
                    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                  </svg>
                </a>
              </li>
              <li className="footer-social">
                <a href="" className="footer-social__link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="48px"
                    height="48px"
                  >
                    <path
                      fill="#2962ff"
                      d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
                    />
                    <path
                      fill="#eee"
                      d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
                    />
                    <path
                      fill="#2962ff"
                      d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
                    />
                    <path
                      fill="#2962ff"
                      d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
                    />
                    <path
                      fill="#2962ff"
                      d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
                    />
                    <path
                      fill="#2962ff"
                      d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="row">
            <h4>Phương thức thanh toán</h4>
            <ul className="footer-list row mt-2 text-center">
              <li className="footer-item col-3">
                <Image
                  src={"/images/payment-method/apple-pay.jpg"}
                  alt="apple pay"
                  width={50}
                  height={50}
                />
              </li>
              <li className="footer-item col-3">
                <Image
                  src={"/images/payment-method/momo.jpg"}
                  alt="momo"
                  width={50}
                  height={50}
                  className="p-1 rounded border"
                />
              </li>
              <li className="footer-item col-3">
                <Image
                  src={"/images/payment-method/one-pay.jpg"}
                  alt="one pay"
                  width={50}
                  height={50}
                  className="p-1 rounded border"
                />
              </li>
              <li className="footer-item col-3">
                <Image
                  src={"/images/payment-method/vn.pay.jpg"}
                  alt="vn pay"
                  width={50}
                  height={50}
                  className="p-1 rounded border"
                />
              </li>
              <li className="footer-item col-3">
                <Image
                  src={"/images/payment-method/zalo-pay.jpg"}
                  alt="zalo pay"
                  width={50}
                  height={50}
                  className="p-1 rounded border"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright row"></div>
    </footer>
  );
};

export default Footer;
