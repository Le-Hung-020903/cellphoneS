"use client";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { convert } from "../../Utils/convertDay";
import toast from "react-hot-toast";
import { mutate } from "swr";
const UpdateDiscount = (props) => {
  const { update, setUpdate, discount, setDiscount } = props;
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const apiGetDiscount = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/discounts`;

  const handleClose = () => {
    setUpdate(false);
    setName("");
    setNumber(0);
    setStart("");
    setEnd("");
    setDiscount(null);
  };

  useEffect(() => {
    if (discount && discount.id) {
      setId(discount.id);
      setName(discount.name);
      setNumber(discount.discount_code);
      setStart(discount.start_day);
      setEnd(discount.end_day);
    }
  }, [discount]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiGetDiscount}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: number,
          start,
          end,
          name,
        }),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Cập nhật thành công");
        handleClose();
        mutate(apiGetDiscount);
      } else {
        throw new Error("Failed to update discount.");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div>
      <Modal
        show={update}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="text-black">
          <Modal.Title>Thêm mới danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <Form>
              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mã Giảm Giá</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mã"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Giảm Giá</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="10%"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="row gap-4">
            <Form className="col">
              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Start day"
                  value={convert(start)}
                  onChange={(e) => setStart(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form className="col">
              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="End day"
                  value={convert(end)}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
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

export default UpdateDiscount;
