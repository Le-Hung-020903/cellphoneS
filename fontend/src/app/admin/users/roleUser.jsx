"use client";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import useSWR, { mutate } from "swr";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";

const RoleUser = (props) => {
  const { role, setRole, roleId, user } = props;
  const [roleUser, setRoleUser] = useState([]);
  const apiCreateRole = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/roles/${roleId}`;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data } = useSWR(apiCreateRole, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data?.data?.userRoles?.roles) {
      const roleValues = data?.data?.userRoles?.roles?.map((role) => role.id);
      setRoleUser(roleValues);
    }
  }, [data]);

  const handleChangeRole = (e) => {
    const { checked, value } = e.target;
    const valueInt = parseInt(value);
    if (checked) {
      setRoleUser((prev) => [...prev, valueInt]);
    } else {
      setRoleUser((prev) => prev.filter((item) => item !== valueInt));
    }
  };
  const handleClose = () => {
    setRoleUser([]);
    setRole(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiCreateRole, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roles: roleUser,
        }),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Tạo vai trò thành công");
        setRole(false);
        mutate(`${apiCreateRole}/${roleId}`);
        handleClose();
      } else {
        toast.error("Tạo vai trò thất bại");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Modal
        show={role}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-black">
          <Modal.Title>{`Tạo quyền cho ${user?.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex gap-3 justify-content-around flex-wrap">
              {data?.data?.roles?.map((item) => {
                return (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      name="roles"
                      value={item.id}
                      checked={roleUser?.includes(item.id)}
                      className="mx-3"
                      onChange={handleChangeRole}
                    />
                    {item.name}
                  </label>
                );
              })}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary text-black" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary text-black" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleUser;
