import { createAsyncThunk } from "@reduxjs/toolkit";
export const addProductReview = createAsyncThunk(
  "addProductReview",
  async ({
    product_id,
    order_id,
    star,
    review_content,
    url_image,
    verified_purchase,
  }) => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${api}/api/v1/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        order_id: order_id,
        star: star,
        review_content: review_content,
        url_image: url_image,
        verified_purchase: verified_purchase,
      }),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  }
);
