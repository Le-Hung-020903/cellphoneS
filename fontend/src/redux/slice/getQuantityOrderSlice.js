import { createSlice } from "@reduxjs/toolkit";
import { getQuantityOrder } from "../middlewares/getQuantityOrder";
const initialState = {
  quantity: 0,
};
export const getQuantityOrderSlice = createSlice({
  name: "quantityOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getQuantityOrder.fulfilled, (state, action) => {
      state.quantity = action.payload;
    });
  },
});
