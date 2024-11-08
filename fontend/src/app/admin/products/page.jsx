"use client";
import Link from "next/link";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import toast from "react-hot-toast";
import { formatMoney } from "../../Utils/formatMoney";
import PaginationPage from "../../components/pagination";
import { useProfile } from "../profileContext";
const PageProduct = () => {
  const { profile } = useProfile();
  const [page, setPage] = useState(1);
  const apiDeleteProduct = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/`;
  const apiGetProducts = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?page=${page}`;
  const [temporaryUrl, setTemporaryUrl] = useState(apiGetProducts);
  const isAddProduct =
    profile && profile?.data?.permissions?.includes("products.insert");
  const isEditProduct =
    profile && profile?.data?.permissions?.includes("products.update");
  const isDeleteProduct =
    profile && profile?.data?.permissions?.includes("products.delete");
  const fetcher = (url) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());

  const { isLoading, error, data } = useSWR(apiGetProducts, fetcher, {
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
  const totalPages = data?.data?.totalPages;

  // function handle pagination
  const handlePage = (page) => {
    setPage(page);
    setTemporaryUrl(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?page=${page}`
    );
  };

  // function delete product
  const handleDeleteProduct = async (e, id) => {
    e.preventDefault();
    if (confirm(`Bạn có chắc chắn xoá sản phẩm thứ ${id} không ?`)) {
      try {
        const res = await fetch(`${apiDeleteProduct}${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          toast.success("Product deleted successfully");
          mutate(apiGetProducts);
        }
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

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
          <h3>Quản lí sản phẩm</h3>
          {isAddProduct && (
            <Link
              href={"/admin/products/createProduct"}
              className="btn btn-primary"
            >
              Thêm mới
            </Link>
          )}
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th width="5%" className="text-center">
                  Ảnh
                </th>
                <th className="text-center">Tên Sản Phẩm</th>
                <th className="text-center">Loại Sản Phẩm</th>
                <th className="text-center">Số Lượng</th>
                <th className="text-center">Giá Gốc</th>
                <th className="text-center">Giảm Giá</th>
                <th width="10%" className="text-center">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td width="15%">
                    <Image
                      src={product.Products_images[0]?.url_image}
                      width={170}
                      height={200}
                      className="object-fit-cover"
                      alt={`Picture of product ${product.name}`}
                    />
                  </td>
                  <td width="15%">
                    <b className="d-block px-2 mt-4">{product.name}</b>
                  </td>
                  <td width="15%">
                    <b className="d-block px-2 mt-4">
                      {product.categories.name}
                    </b>
                  </td>
                  <td width="10%">
                    <b className="d-block px-2 mt-4">{product.quantity}</b>
                  </td>
                  <td width="10%">
                    <b className="d-block px-2 mt-4">
                      {formatMoney(product.price)}
                    </b>
                  </td>
                  <td width="10%">
                    <b className="d-block px-2 mt-4">
                      {product.discount[0]?.discount_code
                        ? `${product.discount[0]?.discount_code}%`
                        : "0%"}
                    </b>
                  </td>
                  <td className="text-center d-flex gap-1 mt-2" width="20%">
                    {isEditProduct && (
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="btn btn-warning"
                      >
                        Sửa
                      </Link>
                    )}
                    {isDeleteProduct && (
                      <form action="" method="post">
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDeleteProduct(e, product.id)}
                        >
                          Xoá
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationPage
            totalPages={totalPages}
            page={page}
            handlePage={handlePage}
          />
        </>
      )}
    </div>
  );
};

export default PageProduct;
