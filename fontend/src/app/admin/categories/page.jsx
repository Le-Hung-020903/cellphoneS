"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import CreateCategories from "./createCategories";
import toast from "react-hot-toast";
import UpdateCategories from "./updateCategories";
import { useProfile } from "../profileContext";
const PageCategories = () => {
  const { profile } = useProfile();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  // const [quantity, setQuantity] = useState(0); đếm số lượng sản phẩm cho một danh mục, CHƯA LÀM
  const [id, setId] = useState(0);
  const [categories, setCategories] = useState({});
  const isAddCategory =
    profile && profile?.data?.permissions?.includes("categories.insert");
  const isDeleteCategory =
    profile && profile?.data?.permissions?.includes("categories.delete");
  const isEditCategory =
    profile && profile?.data?.permissions?.includes("categories.update");

  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());
  const apiGetCategories = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`;
  // const apiCountQuantity = `http://localhost:3000/api/v1/categories/0/products/count`;
  const handleDelete = async (e, id, name) => {
    e.preventDefault();
    try {
      if (confirm(`Bạn có muốn xoá danh mục ${name} ?`)) {
        const res = await fetch(`${apiGetCategories}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          toast.success("Xoá danh mục thành công");
          mutate(apiGetCategories);
        } else {
          throw new Error("Xoá danh mục thất bại");
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const { data, error, isLoading } = useSWR(apiGetCategories, fetcher, {
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
  // useEffect(() => {
  //   const countQuantity = async (id) => {
  //     const response = await fetch(
  //       `http://localhost:3000/api/v1/categories/${id}/products/count`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setQuantity(data.data.count);
  //     }
  //   };
  // }, []);
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
          <h2>Quản trị danh mục sản phẩm</h2>
          {isAddCategory && (
            <button className="btn btn-primary" onClick={() => setCreate(true)}>
              Thêm mới
            </button>
          )}
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th width="5%">STT</th>
                <th width="20%">Tên</th>
                <th className="text-center" width="20%">
                  Mô tả
                </th>
                <th width="10%">Thiết bị</th>
                <th className="text-center" width="10%">
                  Số lượng sản phẩm
                </th>
                {isEditCategory && (
                  <th width="8%" className="text-center">
                    Sửa
                  </th>
                )}
                {isDeleteCategory && (
                  <th width="8%" className="text-center">
                    Xoá
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.data?.categories?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.device}</td>
                    <td className="text-center">3</td>
                    {isEditCategory && (
                      <td className="text-center">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setUpdate(true);
                            setCategories(item);
                            setId(item.id);
                          }}
                        >
                          Sửa
                        </button>
                      </td>
                    )}
                    {isDeleteCategory && (
                      <td className="text-center">
                        <form action="" method="post">
                          <button
                            className="btn btn-danger"
                            onClick={(e) => handleDelete(e, item.id, item.name)}
                          >
                            Xoá
                          </button>
                        </form>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <CreateCategories create={create} setCreate={setCreate} />
          <UpdateCategories
            id={id}
            update={update}
            setUpdate={setUpdate}
            categories={categories}
            setCategories={setCategories}
          />
        </>
      )}
    </div>
  );
};

export default PageCategories;
