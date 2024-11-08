import { createAsyncThunk } from "@reduxjs/toolkit";
export const addCartProducts = createAsyncThunk(
  "addCartProducts",
  async ({ product_id, quantity }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          quantity,
        }),
        credentials: "include",
      }
    );
    const data = await response.json();
    return data?.data?.cartProduct;
  }
);
