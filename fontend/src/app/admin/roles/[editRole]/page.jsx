"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import toast from "react-hot-toast";
import { useProfile } from "../../profileContext";

const PageEditRole = (props) => {
  const { profile } = useProfile();
  const id = props.params.editRole;
  const isEditRole =
    profile && profile?.data?.permissions?.includes("roles.update");
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const api = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/roles/${id}`;
  const apiGetModules = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/modules`;
  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());

  const {
    data: managers,
    error,
    isLoading,
  } = useSWR(apiGetModules, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: roleDetail } = useSWR(api, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (roleDetail?.data) {
      setName(roleDetail?.data?.name);
      const permissionValue = roleDetail?.data?.permissions?.map(
        (permission) => permission.value
      );
      setPermissions(permissionValue);
    }
  }, [roleDetail]);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error...</h3>;
  }

  // function handle edit permissions
  const handleEditPermissions = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          permissions: permissions,
        }),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Cập nhật vai trò thành công");
        mutate(api);
      } else {
        throw new Error("Failed to update role.");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  // function handle change checkbox
  const handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions((prevPermissions) => [...prevPermissions, value]);
    } else {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== value)
      );
    }
  };

  // function handle translate actions
  const translateActions = (action) => {
    switch (action) {
      case "read":
        return "Xem";
      case "insert":
        return "Thêm mới";
      case "update":
        return "Chỉnh sửa";
      case "delete":
        return "Xoá";
      case "manage":
        return "Quản lý";
      default:
        return action;
    }
  };

  return (
    <div>
      {isEditRole ? (
        <>
          <h2>Sửa vai trò </h2>
          <form action="" method="post">
            <div className="mb-3">
              <label htmlFor="role">Tên</label>
              <input
                type="text"
                name="name"
                id="role"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mt-2"
                placeholder="Tên vai trò..."
              />
            </div>

            <div className="mb-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="20%">Chức năng</th>
                    <th>Quyền</th>
                  </tr>
                </thead>
                <tbody>
                  {managers?.data?.modules?.map((module, index) => {
                    return (
                      <tr key={index}>
                        <td>{module.desc}</td>
                        <td>
                          <div className="row mt-2">
                            {module?.actions?.map((action) => {
                              return (
                                <div className="col-3" key={action.id}>
                                  <label className="d-flex gap-2">
                                    <input
                                      type="checkbox"
                                      name="permissions"
                                      value={`${module.name}.${action.name}`}
                                      checked={permissions?.includes(
                                        `${module.name}.${action.name}`
                                      )}
                                      onChange={handleChangeCheckbox}
                                    />
                                    <span>{translateActions(action.name)}</span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={(e) => handleEditPermissions(e)}
              >
                Lưu thay đổi
              </button>
              <Link href="/admin/roles" className="btn btn-danger">
                Huỷ
              </Link>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>Quyền truy cập bị từ chối</h1>
          <p className="fw-bolder">
            Bạn không có quyền truy cập vào trang này.
          </p>
        </>
      )}
    </div>
  );
};

export default PageEditRole;
