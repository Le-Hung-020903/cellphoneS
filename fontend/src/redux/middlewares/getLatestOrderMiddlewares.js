import { createAsyncThunk } from "@reduxjs/toolkit";
export const getLatestOrder = createAsyncThunk("getLatestOrder", async () => {
  const response = await fetch("http://localhost:3000/api/v1/order", {
    credentials: "include",
  });
  const data = await response.json();
  return data?.data;
});
