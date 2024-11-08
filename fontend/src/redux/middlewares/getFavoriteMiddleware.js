import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFavoriteProducts = createAsyncThunk(
  "getFavoriteProducts",
  async () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${api}/api/v1/favoriteProduct`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  }
);
