import * as yup from "yup";
export const passwordSchema = yup.object().shape({
  current_password: yup
    .string()
    .min(8, "Current password must contain at least 8 characters")
    .required("Current password is required"),
  new_password: yup
    .string()
    .min(8, "New password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
    )
    .required("New password is required"),
  confirm_password: yup
    .string()
    .min(8, "Confirm password must contain at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
    )
    .oneOf(
      [yup.ref("new_password"), null],
      "Confirm password must match the new password"
    )
    .required("Confirm password is required"),
});
