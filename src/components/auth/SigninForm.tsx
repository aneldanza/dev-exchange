import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSignInMutation } from "../../services/api";
import { InputField } from "../common/InputField";

interface SignInCredentials {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SignInForm = () => {
  const [signIn] = useSignInMutation();

  const initialValues: SignInCredentials = {
    email: "",
    password: "",
  };

  const handleSignIn = async (credentials: SignInCredentials) => {
    try {
      const result = await signIn(credentials).unwrap();
      console.log(result);
      console.log(document.cookie);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (values: SignInCredentials) => {
    handleSignIn(values);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-4/5">
        <div className="mb-6 text-center">Log in</div>

        <div className="mx-auto mb-6 p-6 border rounded-lg shadow-md text-sm bg-white">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col  space-y-6 ">
              <InputField label="Email" name="email" />
              <InputField label="Password" name="password" />
              <button type="submit" className="btn-primary">
                Log in
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
