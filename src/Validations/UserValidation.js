import * as yup from "yup";

export const SignUpSchema= yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().min(6).required(),
})
export const SignInSchema= yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})