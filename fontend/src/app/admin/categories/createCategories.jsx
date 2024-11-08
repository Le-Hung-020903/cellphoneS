"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { revalidateCategories } from "../../actions/revalidateData";

const CreateCategories = (props) => {
  const { setCreate, create } = props;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [device, setDevice] = useState("");
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState(null);
  const apiCreateCategory = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`;

  const handleClose = () => {
    setName("");
    setValue(0);
    setDevice("");
    setDesc("");
    setCreate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiCreateCategory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          desc: desc,
          parent_id: value,
          device: device,
        }),
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Thêm mới danh mục thành công");
        handleClose();
        mutate(apiCreateCategory);
        revalidateCategories();
      } else {
        throw new Error("Thêm mới danh mục thất bại");
      }
    } catch (e) {
      return toast(e.message);
    }
  };

  useEffect(() => {
    const handleGetRootCategories = async () => {
      try {
        const result = await fetch(apiCreateCategory);
        if (result.ok) {
          const data = await result.json();
          setCategories(data?.data?.categories);
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
        show={create}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-black">
          <Modal.Title>Thêm mới danh mục</Modal.Title>
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
              controlId="exampleForm.ControlInput2"
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
              {categories?.map((category) => {
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateCategories;
