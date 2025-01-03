import { type FC, useState } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import Flash from "../common/Flash";

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
  const [formError, setFormError] = useState<string[]>([]);

  const handleSubmit = async (values: { body: string }) => {
    try {
      await formAction(values.body);

      setFormVisible(false);
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
    </div>
  );
};
