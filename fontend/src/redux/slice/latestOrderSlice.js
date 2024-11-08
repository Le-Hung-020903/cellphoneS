import { createSlice } from "@reduxjs/toolkit";
import { getLatestOrder } from "../middlewares/getLatestOrderMiddlewares";
const initialState = {
  latestOrder: {},
};
export const LatestOrder = createSlice({
  name: "latestOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLatestOrder.fulfilled, (state, action) => {
      state.latestOrder = action.payload;
    });
  },
});
