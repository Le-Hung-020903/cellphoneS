"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { revalidateCategories } from "../../actions/revalidateData";

const UpdateCategories = (props) => {
  const [name, setName] = useState("");
  const { update, setUpdate, categories, setCategories, id } = props;
  const [categorie, setCategorie] = useState(null);
  const [value, setValue] = useState(0);
  const [device, setDevice] = useState("");
  const [desc, setDesc] = useState("");
  const apiUpdateCategories = `${
    import.meta.env.NEXT_PUBLIC_API_URL
  }/api/v1/categories`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUpdateCategories}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          desc: desc,
          parent_id: value,
          device: device,
        }),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Cập nhật danh mục thành công");
        handleClose();
        mutate(apiUpdateCategories);
        revalidateCategories();
      } else {
        throw new Error("Cập nhật danh mục thất bại");
      }
    } catch (e) {
      return toast(e.message);
    }
  };

  const handleClose = () => {
    setUpdate(false);
    setName("");
    setDevice("");
    setDesc("");
    setCategories(null);
  };

  useEffect(() => {
    if (categories && categories.id) {
      setName(categories.name);
      setDesc(categories.desc);
      setDevice(categories.device);
    }
  }, [categories]);

  useEffect(() => {
    const handleGetRootCategories = async () => {
      try {
        const result = await fetch(apiUpdateCategories);
        if (result.ok) {
          const data = await result.json();
          setCategorie(data?.data?.rootCategories);
        }
      } catch (e) {
        toast(e.message);
      }
    };
    handleGetRootCategories();
  }, []);

  return (
    <div>
      <Modal
        show={update}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-black">
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="exampleForm.ControlInput5"
            >
              <Form.Label>Device</Form.Label>
              <Form.Control
                type="text"
                placeholder="device"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="">Select root category</option>
              {categorie?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary text-black" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary text-black" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateCategories;
