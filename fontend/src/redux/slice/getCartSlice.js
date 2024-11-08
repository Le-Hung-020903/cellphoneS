import { createSlice } from "@reduxjs/toolkit";
import { getCartProducts } from "../middlewares/getCartMiddlewares";
const initialState = {
  price: 0,
  quantity: 0,
  products: [],
};
export const getCartSlice = createSlice({
  name: "getCart",
  initialState,
  reducers: {
    cartPrice: (state, action) => {
      state.price = state.products?.cart_products?.reduce((total, product) => {
        return total + product.unit_price * product.quantity;
      }, 0);
    },
    getQuantity: (state, action) => {
      state.quantity = state.products?.cart_products?.reduce(
        (total, product) => {
          return total + product.quantity;
        },
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
export const { cartPrice, getQuantity } = getCartSlice.actions;
