import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useUpdateUserMutation } from "../../services/api";
import { QuillEditor } from "../common/QuillEditor";
import { FullUserData } from "./types";
import { RichContent } from "../common/RichContent";
import Flash from "../common/Flash";

type FormValues = {
  about: string;
};

const validationsSchema = Yup.object().shape({
  about: Yup.string(),
});

interface EditSettingsProps {
  data: FullUserData;
}

const messages: { [key: string]: { text: string; className: string } } = {
  success: {
    text: "User updated successfully",
    className: "success",
  },

  error: {
    text: "An error occurred while updating user",
    className: "failure",
  },
};

const EditSettings: React.FC<EditSettingsProps> = ({ data }) => {
  const [updateUser] = useUpdateUserMutation();
  const [message, setMessage] = useState<string>("");

  const initialValues: FormValues = {
    about: data.description,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateUser({
        user: { id: data.id, description: values.about },
      }).unwrap();

      setMessage("success");
    } catch (error) {
      console.error(error);
      setMessage("failure");
    }
  };

  return (
    <div className="list">
      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationsSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div className="list mb-6">
                <div>
                  <QuillEditor
                    name="about"
                    placeholder="Tell us about yourself"
                    label="About me"
                  />
                  <RichContent body={props.values.about} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    props.isSubmitting ||
                    Object.keys(props.touched).length === 0 ||
                    !props.isValid
                  }
                >
                  Save
                </button>

                <button
                  type="reset"
                  className="btn btn-outline border-0 text-blue-500 py-2 hover:bg-blue-50"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Flash
        style="success"
        display={!!message}
        resetDisplay={() => setMessage("")}
        message={messages[message] ? messages[message].text : ""}
      ></Flash>
    </div>
  );
};

export default EditSettings;
