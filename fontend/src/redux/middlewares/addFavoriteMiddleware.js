import { createAsyncThunk } from "@reduxjs/toolkit";
export const addFavoriteProduct = createAsyncThunk(
  "addFavoriteProduct",
  async (id) => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${api}/api/v1/favoriteProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  }
);
