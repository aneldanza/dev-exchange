import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useUpdateUserMutation } from "../../../services/api";
// import { QuillEditor } from "../../common/QuillEditor";
import { FullUserData } from "../types";
// import { RichContent } from "../../common/RichContent";
import Flash from "../../common/Flash";
import { useAuth } from "../../../services/storeHooks";
import MarkdownEditor from "../../common/MarkdownEditor";
import MarkdownViewer from "../../common/MarkDownViewer";

type FormValues = {
  about: string;
};

const validationsSchema = Yup.object().shape({
  about: Yup.string(),
});

interface EditSettingsProps {
  data: FullUserData;
}

const EditSettings: React.FC<EditSettingsProps> = ({ data }) => {
  const [updateUser] = useUpdateUserMutation();
  const [messageType, setMessageType] = useState<
    "success" | "failure" | "info"
  >("info");
  const [formMessage, setFormMessage] = useState<string[]>([]);
  const { clearUser } = useAuth();

  const initialValues: FormValues = {
    about: data.description,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateUser({
        user: { id: data.id, description: values.about },
      }).unwrap();

      setMessageType("success");
      setFormMessage(["Profile updated successfully"]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setFormMessage([...e.data.errors]);
        } else {
          setFormMessage([e.data.error]);
        }
      } else {
        setFormMessage(["An error occurred. Please try again later."]);
      }
      if (e.status === 401) {
        clearUser();
      }

      setMessageType("failure");
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
                  <MarkdownEditor
                    value={props.values.about}
                    onChange={(value) => {
                      props.setFieldValue("about", value);
                      props.setFieldTouched("about", true);
                    }}
                  />
                  {props.touched.about && props.errors.about && (
                    <div className="text-red-500 text-sm">
                      {props.errors.about}
                    </div>
                  )}

                  <MarkdownViewer content={props.values.about} />
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
        style={messageType}
        display={!!formMessage.length}
        resetDisplay={() => setFormMessage([])}
      >
        <ul className="list-item">
          {formMessage.map((error, index) => (
            <li key={index}>{`${error}`}</li>
          ))}
        </ul>
      </Flash>
    </div>
  );
};

export default EditSettings;
