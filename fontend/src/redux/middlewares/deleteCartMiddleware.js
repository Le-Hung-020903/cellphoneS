import { createAsyncThunk } from "@reduxjs/toolkit";
export const deleteCart = createAsyncThunk("deleteCart", async ({ id }) => {
  const response = await fetch(`http://localhost:3000/api/v1/cart/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  return data?.message;
});
