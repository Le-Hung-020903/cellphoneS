import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../redux/slice/userSlice";
import { addCartSlice } from "../redux/slice/addCartSlice";
import { getCartSlice } from "../redux/slice/getCartSlice";
import { deleteSlice } from "../redux/slice/deleteCartSlice";
import { getLocation } from "../redux/slice/getLocation";
import { LatestOrder } from "../redux/slice/latestOrderSlice";
import { getFavoriteSlice } from "../redux/slice/getFavoriteSlice";
import { getQuantityOrderSlice } from "../redux/slice/getQuantityOrderSlice";
import { addFavoriteSlice } from "../redux/slice/addFavoriteSlice";
import { addProductReviewSlice } from "../redux/slice/addProductReviewSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    addCart: addCartSlice.reducer,
    getCart: getCartSlice.reducer,
    deleteCart: deleteSlice.reducer,
    getLocation: getLocation.reducer,
    getLatestOrder: LatestOrder.reducer,
    favoriteProducts: getFavoriteSlice.reducer,
    getQuantityOrder: getQuantityOrderSlice.reducer,
    addFavoriteProduct: addFavoriteSlice.reducer,
    addProductReview: addProductReviewSlice.reducer,
  },
});
