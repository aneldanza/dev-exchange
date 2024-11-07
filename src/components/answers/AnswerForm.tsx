import { QuillEditor } from "../common/QuillEditor";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { useCreateAnswerMutation } from "../../services/api";
import { removeSelectElement } from "../../services/utils";
import React, { useState } from "react";
import Flash from "../common/Flash";

const validationsSchema = Yup.object().shape({
  body: Yup.string().required("Content is required").min(10),
});

interface AnswerFormProps {
  questionId: number;
  userId: number;
  setShowAnswerForm: (showAnswerForm: boolean) => void;
  initialBody?: string;
  answerAction: (data: { body: string }) => Promise<void>;
  submitText?: string;
}

export const AnswerForm: React.FC<AnswerFormProps> = ({
  // questionId,
  // userId,
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

  // const [createAnswer] = useCreateAnswerMutation();

  const addAnswer = async (values: { body: string }) => {
    const modifiedBody = removeSelectElement(values.body);
    try {
      await answerAction({ body: modifiedBody });
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
        setResetForm(true);
        actions.resetForm();
        setShowAnswerForm(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
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
            disabled={isSubmitting || !isValid}
          >
            {submitText}
          </button>

          <Flash
            style="failure"
            display={!!formError.length}
            setFormError={setFormError}
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
