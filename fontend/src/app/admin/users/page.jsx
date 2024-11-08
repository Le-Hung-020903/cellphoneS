"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import CreateUser from "./createUser";
import UpdateUser from "./updateUser";
import toast from "react-hot-toast";
import PaginationPage from "../../components/pagination";
import RoleUser from "./roleUser";
import { convert } from "../../Utils/convertDay";
import { useProfile } from "../profileContext";

const PageUser = () => {
  const { profile } = useProfile();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [role, setRole] = useState(false);
  const [roleId, setRoleId] = useState(0);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(null);

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}`;
  const urlDelete = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`;
  const [temporaryUrl, setTemporaryUrl] = useState(url);
  const isAddUser =
    profile && profile?.data?.permissions?.includes("users.insert");
  const isEditUser =
    profile && profile?.data?.permissions?.includes("users.update");
  const isDeleteUser =
    profile && profile?.data?.permissions?.includes("users.delete");
  const isAddDecentralization =
    profile && profile?.data?.permissions?.includes("decentralization.insert");

  const fetcher = (url) =>
    fetch(url, {
      credentials: "include",
    }).then((res) => res.json());

  const handlePage = (page) => {
    setPage(page);
    setTemporaryUrl(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}`
    );
  };

  const handleDelete = async (e, id, name) => {
    e.preventDefault();
    try {
      if (confirm(`Are you sure you want to delete ${name}`)) {
        const res = await fetch(`${urlDelete}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          toast.success("Delete user successfully");
          mutate(url);
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const { data, error, isLoading } = useSWR(temporaryUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const totalPages = data?.totalPages;

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Đã có lỗi xảy ra...</h3>;
  }

  return (
    <div>
      {data?.message === "You don't have permission" && data?.status === 403 ? (
        <>
          <h1>Quyền truy cập bị từ chối</h1>
          <p className="fw-bolder">
            Bạn không có quyền truy cập vào trang này.
          </p>
        </>
      ) : (
        <>
          <h2 className="h1">Danh sách người dùng</h2>
          {isAddUser && (
            <button
              className="btn btn-primary d-flex justify-content-end"
              onClick={() => setCreate(true)}
            >
              Add user
            </button>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let newUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}`;
              if (status !== null || q !== null) {
                newUrl += `&status=${status}&q=${q}`;
              }
              setTemporaryUrl(newUrl);
            }}
            className="mt-3"
          >
            <div className="row">
              <div className="col-3">
                <select
                  name="status"
                  id=""
                  className="form-select"
                  value={status || ""}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                  <option value="true">Đang kích hoạt</option>
                  <option value="false">Chưa kích hoạt</option>
                </select>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="q"
                  id=""
                  className="form-control"
                  value={q}
                  placeholder="Từ khoá ..."
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="col-3 row column-gap-3">
                <button className="col-6 btn btn-success">Tìm kiếm</button>
                <button className="col-5 btn btn-danger">Xoá Tất cả</button>
              </div>
            </div>
          </form>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="checkbox_all" id="" />
                </th>
                <th width="5%">STT</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Ngày tạo</th>
                <th>Trạng Thái</th>
                {isAddDecentralization && <th>Phân quyền</th>}
                {isEditUser && <th width="5%">Sửa</th>}
                {isDeleteUser && <th width="5%">Xoá</th>}
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <input type="checkbox" value={user.id} id="" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{convert(user.created_at)}</td>
                    <td>
                      {user.status ? (
                        <span className="bg-success text-white p-1 rounded">
                          đang kích hoạt
                        </span>
                      ) : (
                        <span className="bg-danger text-white p-1 rounded">
                          chưa kích hoạt
                        </span>
                      )}
                    </td>
                    {isAddDecentralization && (
                      <th>
                        <button
                          className="btn btn-info text-white p-1 rounded"
                          onClick={() => {
                            setRole(true);
                            setUser(user);
                            setRoleId(user.id);
                          }}
                        >
                          Phân quyền
                        </button>
                      </th>
                    )}
                    {isEditUser && (
                      <td>
                        <button
                          className="btn btn-warning text-white"
                          onClick={() => {
                            setUpdate(true);
                            setUser(user);
                          }}
                        >
                          Sửa
                        </button>
                      </td>
                    )}
                    {isDeleteUser && (
                      <td>
                        <form action="">
                          <button
                            className="btn btn-danger text-white"
                            onClick={(e) => handleDelete(e, user.id, user.name)}
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
          <PaginationPage
            totalPages={totalPages}
            page={page}
            handlePage={handlePage}
          />
          <CreateUser create={create} setCreate={setCreate} />
          <UpdateUser
            update={update}
            setUpdate={setUpdate}
            user={user}
            setUser={setUser}
          />
          <RoleUser role={role} setRole={setRole} roleId={roleId} user={user} />
        </>
      )}
    </div>
  );
};

export default PageUser;
