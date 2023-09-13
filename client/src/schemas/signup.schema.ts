import * as yup from "yup";

export const Signupschema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password is too short"),
  name: yup.string().min(3, "Name is too short").required("Name is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  provider: yup.boolean(),
});
