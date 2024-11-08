import { createAsyncThunk } from "@reduxjs/toolkit";
export const getCartProducts = createAsyncThunk("getCartProducts", async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data?.data?.products;
});
