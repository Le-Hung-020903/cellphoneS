import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { mutate } from "swr";

const CreateUser = (props) => {
  const { create, setCreate } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");

  const userApi = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`;

  const convertValue = (value) => {
    value = Number.parseInt(value, 10);
    if (value === 1) {
      return true;
    } else if (value === 2) {
      return false;
    } else {
      console.error("Invalid value !!!");
      return null;
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setStatus("");
    setAddress("");
    setCreate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Please enter a name");
    }
    if (!email) {
      return toast.error("Please enter an email");
    }
    if (!password) {
      return toast.error("Please enter a password");
    }
    console.log(status);
    if (!phone) {
      return toast.error("Please enter a phone");
    }
    if (!address) {
      return toast.error("Please select a address");
    }
    try {
      const response = await fetch(userApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          status: convertValue(status),
          address,
        }),
        credentials: "include",
      });
      if (response.ok) {
        toast.success("successfully added user.");
        handleClose();
        mutate(userApi);
      } else {
        throw new Error("Failed to add user.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Modal
        show={create}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-black">
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex gap-3">
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
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="flex gap-3">
              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group
              className="mb-3  w-full"
              controlId="exampleForm.ControlInput6"
            >
              <Form.Label>Status</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="1">kích hoạt</option>
                <option value="2">Chưa kích hoạt</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3 w-full"
              controlId="exampleForm.ControlInput7"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
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
    </>
  );
};

export default CreateUser;
