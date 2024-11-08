const yup = require("yup");
const reviewSchema = yup.object().shape({
  star: yup
    .number()
    .min(1, "Star rating must be at least 1")
    .max(5, "Star rating cannot be more than 5")
    .required("Star rating is required"),
  review_content: yup
    .string()
    .min(40, "Review content must be at least 40 characters long")
    .required("Review content is required"),
  url_image: yup.string().required("Url image is required"),
  product_id: yup
    .number()
    .min(1, "Product ID must be positive  number")
    .required("Product ID is required"),
  order_id: yup.number().min(1, "Order ID must be positive  number").nullable(),
  verified_purchase: yup
    .string()
    .oneOf(
      ["pending", "confirmed", "shipping", "delivered", "canceled"],
      "Verified Purchase is not valid"
    )
    .required("Verified Purchase is required"),
});
module.exports = reviewSchema;
