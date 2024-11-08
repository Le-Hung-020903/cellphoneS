import { createAsyncThunk } from "@reduxjs/toolkit";
export const getCartProducts = createAsyncThunk("getCartProducts", async () => {
  const response = await fetch(`http://localhost:3000/api/v1/cart`, {
    credentials: "include",
  });
  const data = await response.json();
  return data?.data?.products;
});
