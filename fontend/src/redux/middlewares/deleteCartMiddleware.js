import { createAsyncThunk } from "@reduxjs/toolkit";
export const deleteCart = createAsyncThunk("deleteCart", async ({ id }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data?.message;
});
