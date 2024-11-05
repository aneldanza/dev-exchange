import { QuillEditor } from "../common/QuillEditor";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useCreateAnswerMutation } from "../../services/api";

const validationsSchema = Yup.object().shape({
  body: Yup.string().required("Content is required").min(10),
});

interface AnswerFormProps {
  questionId: number;
  userId: number;
}

export const AnswerForm: React.FC<AnswerFormProps> = ({
  questionId,
  userId,
}) => {
  const initialValues: { body: string } = {
    body: "",
  };

  const [createAnswer] = useCreateAnswerMutation();

  const addAnswer = async (values: { body: string }) => {
    try {
      await createAnswer({
        question_id: questionId,
        user_id: userId,
        body: values.body,
      });
    } catch (error) {
      console.error("Failed to add answer", error);
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
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="flex flex-col gap-4 my-4">
          <QuillEditor name="body" label="Your Answer" placeholder="" />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !isValid}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
