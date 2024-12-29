import { Formik, Form, FormikState } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../services/api";
import { InputField } from "../common/InputField";
import { useState } from "react";
import { useAuth } from "../../services/storeHooks";

export interface SignUpCredentials {
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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { setUser } = useAuth();

  const handleSignUp = async (
    credentials: SignUpCredentials,
    resetForm: (
      nextState?: Partial<FormikState<SignUpCredentials>> | undefined
    ) => void
  ) => {
    try {
      const result = await signUp({
        user: credentials,
      }).unwrap();

      if (result.message === "Signed up and logged in successfully") {
        navigate("/");
        setUser(result.data);
      }
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data.message && e.data.errors) {
        setErrorMessages([e.data.message, ...e.data.errors]);
        if (e.data.message === "Account created. Please log in to activate.") {
          navigate("/login", { state: { message: e.data.message } });
        }
      } else {
        setErrorMessages(["An error occured. Please try again later."]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-4/5">
        <div className="font-bold text-xl text-center mb-6">
          Join DevExchange
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            handleSignUp(values, resetForm);
          }}
          validationSchema={validationSchema}
          validateOnBlur={true}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-6">
              <InputField name="username" label="Username" />
              <InputField name="email" label="email" />
              <InputField name="password" label="password" />
              <InputField
                name="password_confirmation"
                label="confirm password"
              />
              <button
                type="submit"
                className="btn btn-primary disabled:opacity-50"
                disabled={!(isValid && dirty)}
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>

        <ul className="mt-5 space-y-2">
          {errorMessages.map((errorMessage, i) => (
            <li className="error-text" key={`message-${i + 1}`}>
              {errorMessage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
