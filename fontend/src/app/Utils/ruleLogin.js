import * as yup from "yup";
export const loginSchema = yup.object().shape({
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
});
