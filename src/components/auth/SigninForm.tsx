import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FormikState } from "formik";
import * as Yup from "yup";
import { useSignInMutation } from "../../services/api";
import { InputField } from "../common/InputField";
import { useAuth } from "../../services/storeHooks";

export interface SignInCredentials {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignInForm = () => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { setUser } = useAuth();

  const initialValues: SignInCredentials = {
    email: "",
    password: "",
  };

  const handleSignIn = async (
    credentials: SignInCredentials,
    resetForm: (
      nextState?: Partial<FormikState<SignInCredentials>> | undefined
    ) => void
  ) => {
    try {
      const result = await signIn(credentials).unwrap();
      if (result.status === 200) {
        setUser(result.data.user);
        localStorage.setItem("jwt_token", result.data.token);
        navigate("/");
      }
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setErrorMessages([e.data.message, ...e.data.errors]);
        } else {
          setErrorMessages([e.data]);
        }
      } else {
        setErrorMessages(["An error occured. Please try again later."]);
      }
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-4/5 max-w-[400px]">
        <div className="text-center question-title">Log in</div>

        <div className="mx-auto mb-6 p-6 border rounded-lg shadow-md text-sm bg-white">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              handleSignIn(values, resetForm);
            }}
            validationSchema={validationSchema}
            validateOnBlur={true}
          >
            {({ isValid, dirty }) => (
              <Form className="flex flex-col  space-y-6 ">
                <InputField label="Email" name="email" />
                <InputField label="Password" name="password" />
                <button
                  type="submit"
                  className="btn btn-primary disabled:opacity-50"
                  disabled={!(isValid && dirty)}
                >
                  Log in
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <ul className="mt-5 space-y-2">
          {errorMessages.map((errorMessage, i) => (
            <li className="error-text " key={`message-${i + 1}`}>
              {errorMessage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
