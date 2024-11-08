"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { mutate } from "swr";
const CreateModule = (props) => {
  const initialValues = {
    desc: "",
    name: "",
    actions: [],
  };
  const { create, setCreate } = props;
  const [formData, setFormData] = useState(initialValues);
  const apiCreateModule = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/modules`;

  // function handle changes actions
  const handleChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const action = [...formData.actions, e.target.value];
      setFormData((prevValue) => ({
        ...prevValue,
        actions: action,
      }));
      e.target.value = "";
    }
  };

  // function handle changes input
  const handleChangeInput = (filedName, value) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [filedName]: value,
    }));
  };

  // function handle add module
  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiCreateModule, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Thêm mới chức năng thành công");
        setCreate(false);
        setFormData(initialValues);
        mutate(apiCreateModule);
      } else {
        throw new Error("Failed to create module");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  // function handle close model
  const handleCloseModel = () => {
    setCreate(false);
    setFormData(initialValues);
  };
  return (
    <div>
      <Modal
        show={create}
        onHide={handleCloseModel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-black">
          <Modal.Title>Thêm mới chức năng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Tên chức năng</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                value={formData.desc}
                onChange={(e) => handleChangeInput("desc", e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Tên module</Form.Label>
              <Form.Control
                type="text"
                placeholder="module"
                value={formData.name}
                onChange={(e) => handleChangeInput("name", e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Label>Tên hành động</Form.Label>
              <Form.Control
                type="text"
                placeholder="actions"
                onKeyDown={(e) => handleChange(e)}
              />
            </Form.Group>
            <ul>
              {formData.actions.map((action, index) => {
                return <li key={index}>{action}</li>;
              })}
            </ul>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary text-black" onClick={handleCloseModel}>
            Close
          </Button>
          <Button
            variant="primary text-black"
            onClick={(e) => handleAddModule(e)}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateModule;
