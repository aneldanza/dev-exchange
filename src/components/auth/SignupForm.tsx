import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSignUpMutation, useSignOutMutation } from "../../services/api";
import { InputField } from "../common/InputField";

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
  const [logOut] = useSignOutMutation();

  const handleLogOut = async () => {
    try {
      const result = await logOut("").unwrap();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async (credentials: SignUpCredentials) => {
    try {
      const result = await signUp({
        credentials: { user: credentials },
      }).unwrap();
      console.log(result);
    } catch (e) {}
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

      <div>
        <button className="btn-primary mt-5" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};
