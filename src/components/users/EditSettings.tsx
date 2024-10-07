import { useState } from "react";
import DOMPurify from "dompurify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useUpdateUserMutation } from "../../services/api";
import { RichTextEditor } from "../common/RichTextField";

type FormValues = {
  about: string;
};

const validationsSchema = Yup.object().shape({
  about: Yup.string(),
});

interface EditSettingsProps {
  userId: number;
  description: string;
}

const EditSettings: React.FC<EditSettingsProps> = ({ description, userId }) => {
  const [updateUser] = useUpdateUserMutation();
  const [about, setAbout] = useState(description);

  const initialValues: FormValues = {
    about: about,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await updateUser({ user: { id: userId, description: values.about } });
    } catch (error) {
      console.error(error);
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
          {() => (
            <Form>
              <div className="list mb-6">
                <div>
                  <RichTextEditor
                    name="about"
                    placeholder="Tell us about yourself"
                    label="About me"
                    changeHandler={(value) => setAbout(value)}
                  />
                  <div className="prose prose-sm">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(about),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button type="submit" className="btn btn-primary">
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
    </div>
  );
};

export default EditSettings;
