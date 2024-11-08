"use client";
import React from "react";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import { useProfile } from "../profileContext";
const PageRoles = () => {
  const { profile } = useProfile();
  const api = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/roles`;
  const isAddRole =
    profile && profile?.data?.permissions?.includes("roles.insert");
  const isDeleteRole =
    profile && profile?.data?.permissions?.includes("roles.delete");
  const isEditRole =
    profile && profile?.data?.permissions?.includes("roles.update");

  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(api, fetcher, {
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

  const handleDelete = async (e, name, id) => {
    e.preventDefault();
    try {
      if (confirm(`Bạn có chắc chắn xoá quyền ${name}`)) {
        const res = await fetch(`${api}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          toast.success(`Xoá quyền ${name} thành công`);
          mutate(api);
        } else {
          toast.error(`Xoá quyền ${name} thất bại`);
        }
      }
    } catch (e) {
      toast.error(e.message);
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
          <h2>Quản lý Roles</h2>
          {isAddRole && (
            <Link className="btn btn-primary" href={"/admin/roles/createRole"}>
              Thêm mới
            </Link>
          )}
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th width="5%">STT</th>
                <th>Tên</th>
                {isEditRole && (
                  <th width="8%" className="text-center">
                    Sửa
                  </th>
                )}
                {isDeleteRole && (
                  <th width="8%" className="text-center">
                    Xoá
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.data?.role?.map((role, index) => {
                return (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    {isEditRole && (
                      <td className="text-center">
                        <Link
                          href={`/admin/roles/${role.id}`}
                          className="btn btn-warning"
                        >
                          Sửa
                        </Link>
                      </td>
                    )}
                    {isDeleteRole && (
                      <td className="text-center">
                        <form action="" method="POST">
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              handleDelete(e, role.name, role.id);
                            }}
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
        </>
      )}
    </div>
  );
};

export default PageRoles;
