"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { storage } from "../../../Utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import Link from "next/link";
import { revalidateProducts } from "../../../actions/revalidateData.js";
import { useProfile } from "../../profileContext";

const CreateProduct = () => {
  const { profile } = useProfile();
  const isAddProduct =
    profile && profile?.data?.permissions?.includes("products.insert");
  const initialValues = {
    name: "",
    categories: 0,
    producer: "",
    price: 0,
    discount: 0,
    quantity: 0,
    url_image: [],
    specifications: [],
    desc: "",
  };
  const apiPostProduct = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`;
  const [img, setImg] = useState([]);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialValues);
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);
  const apiGetCategories = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`;
  const apiGetDiscount = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/discounts`;
  const fetcher = (url) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());

  const { data: categories } = useSWR(apiGetCategories, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: discounts } = useSWR(apiGetDiscount, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // function add input
  const handleAddInput = (e) => {
    e.preventDefault();
    setInputs([...inputs, { key: "", value: "" }]);
  };

  // function upload images to firebase
  const handleUploadFile = async () => {
    if (img == null) return;
    const urlImages = [];
    for (let i = 0; i < img.length; i++) {
      const file = img[i];
      const imgRef = ref(storage, `image_product/${file.name + uuidv4()}`);
      try {
        await uploadBytes(imgRef, file);
        const urlImg = await getDownloadURL(imgRef);
        urlImages.push(urlImg);
      } catch (e) {
        toast.error("Error uploading or retrieving url: ", e);
      }
    }
    return urlImages;
  };

  // function get data from formData
  const handleChangeData = (fieldName, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  // function update formData and return new objects specifications and url_image
  const updateFormData = async () => {
    const urlImages = await handleUploadFile();
    const formattedSpecifications = inputs.map((input) => ({
      key: input.key,
      value: input.value,
    }));
    return {
      specifications: formattedSpecifications,
      url_image: urlImages,
    };
  };

  // function to post data to server
  const saveSettings = async () => {
    const price = parseInt(formData.price, 10);
    const discount = parseInt(formData.discount, 10);
    const quantity = parseInt(formData.quantity, 10);

    if (isNaN(price) || isNaN(discount) || isNaN(quantity)) {
      toast.error("Price, discount, and quantity must be valid numbers.");
      return;
    }

    const { specifications, url_image } = await updateFormData();
    const updatedFormData = {
      ...formData,
      price,
      discount,
      quantity,
      specifications,
      url_image,
    };

    try {
      const res = await fetch(apiPostProduct, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      if (res.ok) {
        setInputs([{ key: "", value: "" }]);
        setFormData(initialValues);
        setImg([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        revalidateProducts();
      } else {
        throw new Error("Failed to add product.");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  // Function to handle add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    await toast.promise(saveSettings(), {
      loading: "Đang thêm sản phẩm",
      success: <b>Thêm sản phẩm thành công!</b>,
      error: <b>Không thể thêm sản phẩm.</b>,
    });
  };

  return (
    <div>
      {isAddProduct ? (
        <>
          <h3>Thêm sản phẩm</h3>
          <form action="" method="post">
            <div className="row">
              <div className="col-4">
                <label htmlFor="name">Tên Sản Phẩm:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Tên sản phẩm"
                  className="form-control mt-2"
                  onChange={(e) => handleChangeData("name", e.target.value)}
                />
              </div>
              <div className="col-4">
                <label htmlFor="type">Loại Sản Phẩm:</label>
                <select
                  className="form-select mt-2"
                  id="type"
                  defaultValue={""}
                  value={formData.categories || ""}
                  onChange={(e) =>
                    handleChangeData("categories", e.target.value)
                  }
                >
                  <option value={""}>select categories</option>
                  {categories?.data?.categories?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="brands">Thương Hiệu:</label>
                <input
                  type="text"
                  name="manufacturers"
                  id="brands"
                  placeholder="Tên thương hiệu"
                  className="form-control mt-2"
                  value={formData.producer}
                  onChange={(e) => handleChangeData("producer", e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4">
                <label htmlFor="price">Giá Sản Phẩm:</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Giá sản phẩm"
                  className="form-control mt-2"
                  value={formData.price}
                  onChange={(e) => handleChangeData("price", e.target.value)}
                />
              </div>
              <div className="col-4">
                <label htmlFor="discount">Giảm Giá:</label>
                <select
                  className="form-select mt-2"
                  id="type"
                  defaultValue={""}
                  value={formData.discount || ""}
                  onChange={(e) => handleChangeData("discount", e.target.value)}
                >
                  <option value={""}>select sale</option>
                  {discounts?.data?.discount?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {`${item.discount_code}%`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="quantity">Số Lượng:</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="form-control mt-2"
                  placeholder="Số lượng"
                  value={formData.quantity}
                  onChange={(e) => handleChangeData("quantity", e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-4">
              <label htmlFor="images" className="form-label">
                Chọn Ảnh
              </label>
              <input
                className="form-control"
                type="file"
                id="images"
                ref={fileInputRef}
                multiple
                onChange={(e) => setImg(e.target.files)}
              />
              {/* <div className="d-flex gap-2">
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  className="mt-2 mb-2"
                  alt={`Preview Image ${index}`}
                  width={300}
                  height={300}
                />
              </div>
            ))}
          </div> */}
            </div>
            <div className="row mt-4">
              <label htmlFor="manufacturers">Thông Số Kỹ Thuật:</label>
              {inputs.map((input, index) => (
                <div className="d-flex gap-5 my-2" key={index}>
                  <input
                    type="text"
                    name="key"
                    id="manufacturers"
                    className="form-control"
                    placeholder="Tên"
                    value={input.key}
                    onChange={(e) => {
                      const newInputs = [...inputs]; // Tạo bản sao của inputs
                      newInputs[index].key = e.target.value; // Cập nhật giá trị key
                      setInputs(newInputs); // Cập nhật state
                    }}
                  />
                  <input
                    type="text"
                    name="value"
                    className="form-control"
                    placeholder="Thông số"
                    value={input.value}
                    onChange={(e) => {
                      const newInputs = [...inputs]; // Tạo bản sao của inputs
                      newInputs[index].value = e.target.value; // Cập nhật giá trị value
                      setInputs(newInputs); // Cập nhật state
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={(e) => {
                handleAddInput(e);
              }}
            >
              Thêm thông số
            </button>
            <div className="row mt-4">
              <label htmlFor="description">Mô Tả:</label>
              <div className="form-floating mt-2">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="description"
                  style={{ height: "80px" }}
                  value={formData.desc}
                  onChange={(e) => handleChangeData("desc", e.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea" className="pr-4">
                  Description
                </label>
              </div>
            </div>
            <div className="mt-2 d-flex gap-2 align-items-center">
              <button
                className="btn btn-primary mt-2"
                type="submit"
                onClick={(e) => handleAddProduct(e)}
              >
                Thêm Sản Phẩm
              </button>
              <Link href={"/admin/products"} className="btn btn-danger mt-2">
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

export default CreateProduct;
