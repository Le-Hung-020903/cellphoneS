"use server";
import { revalidateTag } from "next/cache";

const revalidateData = (data) => {
  return async () => {
    return revalidateTag(data);
  };
};

export const revalidateCategories = revalidateData("categories");
export const revalidateProducts = revalidateData("products");
export const revalidateProductsDevice = revalidateData("productDevice");
export const revalidateProductsManufacturer = revalidateData(
  "productManufacturer"
);
export const revalidateProductsCategory = revalidateData("productCategory");
export const revalidateSimilarProducts = revalidateData("similarProducts");
export const revalidateProductDetail = revalidateData("productDetail");
export const revalidateAdminDetailOrder = revalidateData("AdminDetailOrder");
