import { createAsyncThunk } from "@reduxjs/toolkit";
export const getLatestOrder = createAsyncThunk("getLatestOrder", async () => {
  const response = await fetch(
    `${import.meta.env.NEXT_PUBLIC_API_URL}/api/v1/order`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data?.data;
});
