import { createSlice } from "@reduxjs/toolkit";
import { deleteCart } from "../middlewares/deleteCartMiddleware";
const initialState = {
  message: "",
};
export const deleteSlice = createSlice({
  name: "deleteCartSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.message = action.payload;
    });
  },
});
