import { QuillEditor } from "../common/QuillEditor";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { removeSelectElement } from "../../services/utils";
import React, { useState } from "react";
import Flash from "../common/Flash";
import { useAuth } from "../../services/storeHooks";

const validationsSchema = Yup.object().shape({
  body: Yup.string().required("Content is required").min(10),
});

interface AnswerFormProps {
  setShowAnswerForm?: (showAnswerForm: boolean) => void;
  initialBody?: string;
  answerAction: (data: { body: string; user_id: number }) => Promise<void>;
  submitText?: string;
}

export const AnswerForm: React.FC<AnswerFormProps> = ({
  setShowAnswerForm,
  initialBody = "",
  answerAction,
  submitText = "Submit",
}) => {
  const initialValues: { body: string } = {
    body: initialBody,
  };

  const [isFormReset, setResetForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<string[]>([]);
  const { user } = useAuth();

  const addAnswer = async (values: { body: string }) => {
    if (!user) {
      setFormError(["You need to be logged in to answer a question."]);
      return;
    }

    const modifiedBody = removeSelectElement(values.body);
    try {
      await answerAction({ body: modifiedBody, user_id: user.id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setFormError([...e.data.errors]);
        } else {
          setFormError([e.data.error]);
        }
      } else {
        setFormError(["An error occurred. Please try again later."]);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationsSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        addAnswer(values);
        actions.setSubmitting(false);
        actions.resetForm();
        setResetForm(true);
        setShowAnswerForm && setShowAnswerForm(false);
      }}
    >
      {({ isSubmitting, isValid, touched }) => (
        <Form className="flex flex-col gap-4 my-4">
          <QuillEditor
            name="body"
            label="Your Answer"
            placeholder=""
            isFormReset={isFormReset}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              isSubmitting || Object.keys(touched).length === 0 || !isValid
            }
          >
            {submitText}
          </button>

          <Flash
            style="failure"
            display={!!formError.length}
            resetDisplay={() => setFormError([])}
          >
            <ul className="list-item">
              {formError.map((error, index) => (
                <li key={index}>{`${error}`}</li>
              ))}
            </ul>
          </Flash>
        </Form>
      )}
    </Formik>
  );
};
