"use client";
import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import "../(client)/css/home_product.css";
import { addFavoriteProduct } from "../../redux/middlewares/addFavoriteMiddleware";
import { getFavoriteProducts } from "../../redux/middlewares/getFavoriteMiddleware";

const ButtonFilter = (props) => {
  const { productId } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { favoriteProducts } = useSelector((state) => state.favoriteProducts);

  const handleAddFavoriteProduct = async (id) => {
    try {
      const result = await dispatch(addFavoriteProduct(id)).unwrap();
      if (
        result.message === "Add favorite product successfully" &&
        result.status === 200
      ) {
        setIsFavorite(true);
        toast.success("Add favorite product successfully");
      } else {
        throw new Error("Failed to add favorite product");
      }
    } catch (e) {
      toast.error("Add favorite product failed");
    }
  };

  const handleDeleteFavoriteProduct = async (id) => {
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${api}/api/v1/favoriteProduct/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (
        data.status === 200 &&
        data.message === "Delete favorite product successfully"
      ) {
        setIsFavorite(false);
        toast.success("Delete favorite product successfully");
        dispatch(getFavoriteProducts());
      } else {
        throw new Error("Failed to delete favorite product");
      }
    } catch (e) {
      toast.error("Delete favorite product failed");
    }
  };

  // Cập nhật trạng thái yêu thích khi danh sách yêu thích thay đổi
  useEffect(() => {
    const ProductIsFavorite = favoriteProducts?.data?.products?.some(
      (item) => item.id === productId
    );
    setIsFavorite(ProductIsFavorite);
  }, [favoriteProducts, productId]);

  // Gọi API để get list favorite products khi component mount
  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, [dispatch]);

  return (
    <div className="product-heart ms-1">
      {isFavorite ? (
        <GoHeartFill
          className="product-heart-icon"
          onClick={() => {
            handleDeleteFavoriteProduct(productId);
          }}
        />
      ) : (
        <GoHeart
          className="product-heart-icon"
          onClick={() => {
            handleAddFavoriteProduct(productId);
          }}
        />
      )}
    </div>
  );
};

export default ButtonFilter;
