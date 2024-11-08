"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addCartProducts } from "../../redux/middlewares/addCartMiddleware";

const AddToCartButton = (props) => {
  const router = useRouter();
  const { product_id } = props;
  const dispatch = useDispatch();
  const quantity = 1;
  const status = useSelector((state) => state.addCart.status);
  const isLogin = useSelector((state) => state.user.profile?.data?.id);

  const handleAddToCart = async () => {
    try {
      await dispatch(addCartProducts({ product_id, quantity })).unwrap();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: `${e.message}`,
        text: "Thêm sản phẩm bị lỗi, vui lòng thử lại",
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    if (status !== "idle" && status === "success") {
      Swal.fire({
        text: "Sản phẩm đã được thêm vào giỏ hàng",
        icon: "success",
        timer: 2000,
      });
    }
  }, [status]);

  return (
    <div
      className="w-25 mx-auto p-2 border border-danger d-flex align-items-center justify-content-center"
      style={{ borderRadius: "15px", cursor: "pointer" }}
      onClick={() => {
        if (!isLogin) {
          router.push("/auth/login");
        } else {
          handleAddToCart();
        }
      }}
    >
      <Image
        src={"/images/product-detail/add-to-cart.jpg"}
        width={50}
        height={50}
        alt="add to cart"
      />
    </div>
  );
};

export default AddToCartButton;
