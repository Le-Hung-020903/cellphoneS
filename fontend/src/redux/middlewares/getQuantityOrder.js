import { createAsyncThunk } from "@reduxjs/toolkit";
export const getQuantityOrder = createAsyncThunk(
  "getQuantityOrder",
  async () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${api}/api/v1/countOrder`, {
      credentials: "include",
    });
    const data = await response.json();
    return data?.data?.quantity;
  }
);
