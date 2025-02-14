import { type FC } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";

interface CommentFormProps {
  body?: string;
  setFormVisible: (visible: boolean) => void;
  formAction: (body: string) => void;
}

export const CommentForm: FC<CommentFormProps> = ({
  body = "",

  setFormVisible,
  formAction,
}) => {
  const handleSubmit = async (values: { body: string }) => {
    await formAction(values.body);

    setFormVisible(false);
  };
  return (
    <div>
      <Formik initialValues={{ body: body }} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Field
              name="body"
              as="textarea"
              className="text-xs p-2 border border-gray-300 rounded"
              placeholder="Write a comment..."
            />
            <ErrorMessage
              name="body"
              component="div"
              className="text-red-500"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
