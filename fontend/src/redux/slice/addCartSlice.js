import { createSlice } from "@reduxjs/toolkit";
import { addCartProducts } from "../middlewares/addCartMiddleware";
const initialState = {
  cartDetails: [],
  status: "idle",
};
export const addCartSlice = createSlice({
  name: "addCart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addCartProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addCartProducts.fulfilled, (state, action) => {
      const item = action.payload;
      const index = state.cartDetails.findIndex((i) => i?.id === item?.id);
      if (index === -1) {
        state.cartDetails.push(item);
      } else {
        state.cartDetails[index].quantity = item.quantity;
      }
      state.status = "success";
    });
  },
});
