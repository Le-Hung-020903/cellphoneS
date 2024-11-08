"use client";
import React, { useState } from "react";
import CreateDiscount from "./createDiscount";
import useSWR, { mutate } from "swr";
import { convert } from "../../Utils/convertDay";
import toast from "react-hot-toast";
import UpdateDiscount from "./updateDiscount";
import { useProfile } from "../profileContext";
const PageDiscount = () => {
  const { profile } = useProfile();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [discount, setDiscount] = useState(null);
  const isEditDiscount =
    profile && profile?.data?.permissions?.includes("discounts.update");
  const isDeleteDiscount =
    profile && profile?.data?.permissions?.includes("discounts.delete");
  const isAddDiscount =
    profile && profile?.data?.permissions?.includes("discounts.insert");
  const fetcher = (url) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());
  const apiGetDiscount = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/discounts`;

  const handleDelete = async (e, id, name) => {
    e.preventDefault();
    try {
      if (confirm(`Bạn có chắc chắn xoá mã ${name}`)) {
        const res = await fetch(`${apiGetDiscount}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          toast.success(`Xóa mã giảm giá ${name} thành công`);
          mutate(apiGetDiscount);
        } else {
          throw new Error("Failed to delete discount code.");
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const { data, error, isLoading } = useSWR(apiGetDiscount, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }

  return (
    <div>
      {data.message === "You don't have permission" && data.status === 403 ? (
        <>
          <h1>Quyền truy cập bị từ chối</h1>
          <p className="fw-bolder">
            Bạn không có quyền truy cập vào trang này.
          </p>
        </>
      ) : (
        <>
          <h3>Quản trị mã giảm giá</h3>
          {isAddDiscount && (
            <button className="btn btn-primary" onClick={() => setCreate(true)}>
              Thêm mới
            </button>
          )}
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th width="5%">STT</th>
                <th>Mã Giảm Giá</th>
                <th>Giảm Giá</th>
                <th>Ngày Bắt Đầu</th>
                <th>Ngày Kết Thúc</th>
                <th width="10%" className="text-center">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.discount.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td width="25%">{item.name}</td>
                    <td width="25%">{item.discount_code}%</td>
                    <td width="15%">{convert(item.start_day)}</td>
                    <td width="15%">{convert(item.end_day)}</td>
                    <td className="text-center d-flex gap-1" width="20%">
                      {isEditDiscount && (
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setDiscount(item);
                            setUpdate(true);
                          }}
                        >
                          Sửa
                        </button>
                      )}
                      {isDeleteDiscount && (
                        <form action="" method="post">
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              handleDelete(e, item.id, item.name);
                            }}
                          >
                            Xoá
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <CreateDiscount create={create} setCreate={setCreate} />
          <UpdateDiscount
            update={update}
            setUpdate={setUpdate}
            discount={discount}
            setDiscount={setDiscount}
          />
        </>
      )}
    </div>
  );
};

export default PageDiscount;
