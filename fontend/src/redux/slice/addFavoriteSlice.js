import { createSlice } from "@reduxjs/toolkit";
import { addFavoriteProduct } from "../middlewares/addFavoriteMiddleware";
const initialState = {
  message: "",
  stateCode: 0,
};
export const addFavoriteSlice = createSlice({
  name: "addFavoriteProduct",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addFavoriteProduct.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.stateCode = action.payload.status;
    });
  },
});
