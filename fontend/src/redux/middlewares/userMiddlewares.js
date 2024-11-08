import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk("getProfile", async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
});
