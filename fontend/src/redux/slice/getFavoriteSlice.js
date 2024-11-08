import { createSlice } from "@reduxjs/toolkit";
import { getFavoriteProducts } from "../middlewares/getFavoriteMiddleware";
const initialState = {
  favoriteProducts: [],
};
export const getFavoriteSlice = createSlice({
  name: "getFavoriteProducts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFavoriteProducts.fulfilled, (state, action) => {
      state.favoriteProducts = action.payload;
    });
  },
});
