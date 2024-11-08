import { createSlice } from "@reduxjs/toolkit";
import { addProductReview } from "../middlewares/addProductReviewMiddleware";
const initialState = {
  response: "",
  status: "idle",
};
export const addProductReviewSlice = createSlice({
  name: "addProductReview",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProductReview.fulfilled, (state, action) => {
      state.response = action.payload;
      state.status = "success";
    });
  },
});
