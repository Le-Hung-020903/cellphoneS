import * as yup from "yup";
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter the correct email format"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
    ),
  confirmPassword: yup
    .string()
    .required("Please enter your confirm password")
    .oneOf(
      [yup.ref("password"), null],
      "Confirm password must match the password"
    ),
  phone: yup
    .string()
    .required("Please enter a phone number")
    .matches(
      /^(0[1-9][0-9]{8,9})$/,
      "Please enter the correct phone number format"
    ),
});
