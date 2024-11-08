import { createAsyncThunk } from "@reduxjs/toolkit";
export const addCartProducts = createAsyncThunk(
  "addCartProducts",
  async ({ product_id, quantity }) => {
    const response = await fetch(`http://localhost:3000/api/v1/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id,
        quantity,
      }),
      credentials: "include",
    });
    const data = await response.json();
    return data?.data?.cartProduct;
  }
);
