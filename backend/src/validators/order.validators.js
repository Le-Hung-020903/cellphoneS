const yup = require("yup");
const orderSchema = yup.object().shape({
  shipping_address: yup
    .string()
    .required("Shipping address is required")
    .min(20, "Shipping address must contain at least 20 characters"),
  recipient_name: yup.string().required("Recipient name is required"),
  recipient_phone: yup
    .string()
    .required("Recipient phone is required")
    .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, "Recipient phone is not valid"),
  recipient_email: yup
    .string()
    .required("Recipient email is required")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Recipient email is not valid"
    ),
  shipping_fee: yup
    .number()
    .min(0, "Shipping fee must be a positive number")
    .nullable(true)
    .default(0),
  payment_method: yup
    .string()
    .oneOf(
      ["Thanh toán khi nhận hàng", "Chuyển khoản ngân hàng qua mã QR"],
      "Payment method is not valid"
    )
    .required("Payment method is required"),
  cartList: yup
    .array()
    .of(
      yup.object().shape({
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        price: yup
          .number()
          .min(0, "price must be positive  number")
          .required("Price is required"),
        discountAmount: yup
          .number()
          .min(0, "Discount amount must be positive number")
          .nullable(true),
        productId: yup
          .number()
          .required("Product Id is required")
          .min(1, "Product Id must be positive number"),
        productName: yup.string().required("Product Name is required"),
      })
    )
    .required("cart list is required")
    .min(1, "Cart list is not empty"),
});
module.exports = orderSchema;
