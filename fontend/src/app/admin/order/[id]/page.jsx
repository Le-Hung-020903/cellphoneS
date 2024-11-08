import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import NotFound from "../../../not-found";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { revalidateAdminDetailOrder } from "../../../actions/revalidateData";
import { formatMoney } from "../../../Utils/formatMoney";
const adminDetailOrder = async (token, id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/order/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["AdminDetailOrder"] },
    }
  );
  revalidateAdminDetailOrder();
  return response.json();
};
const PageDetailOrder = async (props) => {
  const id = props.params.id;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const data = await adminDetailOrder(token, id);

  return (
    <div className="container">
      <div className="detail-order-wrapper">
        {data?.status === 404 && data?.message === "Order not found" ? (
          <NotFound />
        ) : (
          <>
            <Link
              href={"/admin/order"}
              style={{ color: "#000", fontSize: "25px" }}
            >
              <span>
                <FaArrowLeft />
              </span>
            </Link>
            <div
              style={{
                backgroundColor: "#F3F6F9",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p className="mb-0">ORDER: {data?.data?.order_code}</p>
            </div>
            <div className="row gx-5 mt-4">
              <div className="col-9">
                <table className="table table-nowrap align-middle table-borderless mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col">Product Details</th>
                      <th scope="col">Item Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Discount</th>
                      <th scope="col" className="text-end">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.detail_order?.map((item) => {
                      return (
                        <tr key={item?.detail_order_id}>
                          <td>
                            <div className="d-flex">
                              <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                                <Image
                                  src={`${item?.url_image}`}
                                  width={100}
                                  height={100}
                                  alt="khong biet"
                                  className="img-fluid d-block"
                                />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="fs-14">
                                  <Link
                                    href=""
                                    className="text-body text-decoration-none"
                                  >
                                    {item?.product_name}
                                  </Link>
                                </h5>
                                s
                              </div>
                            </div>
                          </td>
                          <td>{formatMoney(item?.price)}</td>
                          <td className="text-center">{item?.quantity}</td>
                          <td className="text-center">0%</td>
                          <td className="fw-medium text-end">
                            {formatMoney(item?.price * item?.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <span
                  style={{
                    display: "block",
                    borderTop: "1px dashed #e9ebec",
                    paddingTop: "10px",
                  }}
                ></span>
                <div className="mt-4 d-flex justify-content-end">
                  <div className="w-25">
                    <p className="d-flex justify-content-between">
                      <span>Tổng phụ:</span>
                      <span>{formatMoney(data?.data?.total_price)}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <span>Giảm giá: </span>
                      <span>0đ</span>
                    </p>
                    <p className="d-flex justify-content-between">
                      <span>Phí vận chuyển</span>
                      <span>0đ</span>
                    </p>
                    <span
                      style={{
                        display: "block",
                        borderTop: "1px dashed #e9ebec",
                        paddingTop: "10px",
                      }}
                    ></span>
                    <p
                      className="d-flex justify-content-between fw-bold"
                      style={{ color: "#000" }}
                    >
                      <span>Tổng tiền: </span>
                      <span>{formatMoney(data?.data?.total_price)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div
                  style={{
                    backgroundColor: "#F3F6F9",
                    padding: "5px",
                    borderRadius: "6px",
                  }}
                >
                  <h5>Customer Details</h5>
                  <span
                    style={{
                      paddingTop: "5px",
                      display: "block",
                      borderTop: "1px solid #e9ebec",
                    }}
                  ></span>
                  <div className="p-2">
                    <p>Name: {data?.data?.recipient_name}</p>
                    <p>
                      <span>
                        <MdEmail />
                      </span>
                      <span className="ms-2">
                        {data?.data?.recipient_email}
                      </span>
                    </p>
                    <p>
                      <span>
                        <FaPhone />
                      </span>
                      <span className="ms-2">
                        {data?.data?.recipient_phone}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#F3F6F9",
                    padding: "5px",
                    borderRadius: "6px",
                    marginTop: "20px",
                  }}
                >
                  <h5>
                    <span className="me-2">
                      <MdOutlineLocationOn />
                    </span>
                    Shipping Address
                  </h5>
                  <span
                    style={{
                      paddingTop: "5px",
                      display: "block",
                      borderTop: "1px solid #e9ebec",
                    }}
                  ></span>
                  <div className="p-2">
                    <p>Name: {data?.data?.shipping_address}</p>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#F3F6F9",
                    padding: "5px",
                    borderRadius: "6px",
                    marginTop: "20px",
                  }}
                >
                  <h5>
                    <span className="me-2">
                      <MdOutlinePayments />
                    </span>
                    Payment Details
                  </h5>
                  <span
                    style={{
                      paddingTop: "5px",
                      display: "block",
                      borderTop: "1px solid #e9ebec",
                    }}
                  ></span>
                  <div className="p-2">
                    <p>Name: {data?.data?.payment_method}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PageDetailOrder;
