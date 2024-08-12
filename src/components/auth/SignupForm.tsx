import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../services/api";
import { InputField } from "../common/InputField";
import { useState } from "react";

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const initialValues: SignUpCredentials = {
  username: "",
  email: "",
  password_confirmation: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const SignUpForm = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignUp = async (credentials: SignUpCredentials) => {
    try {
      const result = await signUp({
        credentials: { user: credentials },
      }).unwrap();

      console.log(result);
      if (result.message === "Signed up and logged in successfully") {
        navigate("/");
      } else if (result.message === "Signed up but account not active yet") {
        navigate("/login");
      }
    } catch (e: any) {
      console.log(e);
      if (e.data && e.data.errors) {
        setErrorMessage(e.data.errors.join(" "));
      } else {
        setErrorMessage("An error occured. Please try again later.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="font-bold text-xl text-center mb-6">Join DevExchange</div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
      >
        <Form className="space-y-6">
          <InputField name="username" label="Username" />
          <InputField name="email" label="email" />
          <InputField name="password" label="password" />
          <InputField name="password_confirmation" label="confirm password" />
          <button type="submit" className="btn-primary">
            Sign up
          </button>
        </Form>
      </Formik>
      <div className="error-text mt-5">{errorMessage}</div>
    </div>
  );
};
