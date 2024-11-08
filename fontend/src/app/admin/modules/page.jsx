"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import CreateModule from "./createModule";

const PageModules = () => {
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);

  const fetcher = (url) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());
  const apiGetModule = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/modules`;
  const { data, isLoading, error } = useSWR(apiGetModule, fetcher, {
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
      <h2>Quản lí các chức năng</h2>
      <button className="btn btn-primary" onClick={() => setCreate(true)}>
        Thêm mới chức năng
      </button>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th width="5%">STT</th>
            <th>Chức năng</th>

            <th width="10%" className="text-center">
              Thao Tác
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.modules?.map((module, index) => {
            return (
              <tr key={module.id}>
                <td>{index + 1}</td>
                <td width="25%">{module.desc}</td>
                <td className="text-center d-flex justify-content-center gap-1">
                  <button className="btn btn-warning">Sửa</button>
                  {/* <form action="" method="post">
                    <button className="btn btn-danger">Xoá</button>
                  </form> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CreateModule create={create} setCreate={setCreate} />
    </div>
  );
};

export default PageModules;
