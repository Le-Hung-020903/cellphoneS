"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { useProfile } from "../../profileContext";

const CreateRole = () => {
  const { profile } = useProfile();
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const api = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/roles`;
  const apiGetModules = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/modules`;
  const isAddRole =
    profile && profile?.data?.permissions?.includes("roles.insert");
  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(apiGetModules, fetcher, {
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

  // function handle checkbox
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

  // function close modal
  const handleClose = () => {
    setName("");
    setPermissions([]);
  };

  // function  handle add roles
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a role");
      return;
    }
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          permissions,
        }),
      });
      if (response.ok) {
        toast.success("successfully added role.");
        handleClose();
        mutate(api);
      } else {
        throw new Error("Failed to add role.");
      }
    } catch (e) {
      toast.error(e.message);
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
      {isAddRole ? (
        <>
          <h2>Thêm vai trò</h2>
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="name" className="mb-2">
                Tên
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Tên..."
              />
            </div>
            <div className="mt-5">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="20%">Chức năng</th>
                    <th>Quyền</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.modules.map((module) => {
                    return (
                      <tr key={module.id}>
                        <td>{module.desc}</td>
                        <td>
                          <div className="row mt-2">
                            {module?.actions?.map((action) => {
                              return (
                                <div className="col-3" key={action.id}>
                                  <label className="d-flex gap-2">
                                    <input
                                      type="checkbox"
                                      value={`${module.name}.${action.name}`}
                                      className="me-2"
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
            <div className="d-flex gap-3">
              <button className="btn btn-primary">Lưu thay đổi</button>
              <Link href={"/admin/roles"} className="btn btn-danger">
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

export default CreateRole;
