import { FullUserData } from "./types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { RichTextEditor } from "../common/RichTextField";

interface SettingsTabProps {
  data: FullUserData;
}

type FormValues = {
  about: string;
};

const validationsSchema = Yup.object().shape({
  about: Yup.string(),
});

export const SettingsTab: React.FC<SettingsTabProps> = () => {
  const initialValues: FormValues = {
    about: "",
  };

  return (
    <div>
      <div className="text-xl font-bold border-b border-b-appGray-50 mb-6 pb-6">
        Edit your profile
      </div>
      <div className="card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationsSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {() => (
            <Form>
              <div>
                <div>
                  <RichTextEditor
                    name="about"
                    placeholder="Tell us about yourself"
                    label="About me"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button type="submit" className="btn-primary">
                  Save
                </button>

                <button
                  type="reset"
                  className="btn-outline border-0 text-blue-500 py-2 hover:bg-blue-50"
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
