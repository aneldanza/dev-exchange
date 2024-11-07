import { Link, useNavigate } from "react-router-dom";
import { CustomError } from "../common/CustomError";
import { FullAnswerData } from "./types";
import { type FC, useState } from "react";
import DOMPurify from "dompurify";
import { Formik, Form } from "formik";
import { QuillEditor } from "../common/QuillEditor";
import * as Yup from "yup";
import { UnsavedChangesModal } from "../common/UnsavedChangesModal";
import { useHighlightCodeBlocks } from "../hooks/useHighlightCodeBlocks";
import { useUpdateAnswerMutation } from "../../services/api";

interface EditAnswerProps {
  answer: FullAnswerData | undefined;
}

type EditFormValues = {
  body: string;
};

const validationsSchema = Yup.object().shape({
  body: Yup.string().required("Body is required").min(10, "Body is too short"),
});

export const EditAnswer: FC<EditAnswerProps> = ({ answer }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  useHighlightCodeBlocks(answer);
  const [updateAnswer] = useUpdateAnswerMutation();
  const navigate = useNavigate();

  if (!answer) {
    return <CustomError message="Answer not found" />;
  }
  const initialBody = answer.body;

  const initialValues: EditFormValues = {
    body: answer.body,
  };

  const handleSubmit = async (values: EditFormValues) => {
    try {
      await updateAnswer({
        id: answer.id,
        body: values.body,
      }).unwrap();
      navigate(`/questions/${answer.question_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = (values: EditFormValues) => {
    if (values.body !== initialBody) {
      setOpenModal(true);
    } else {
      navigate(`/questions/${answer.question_id}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-base">
      <div>
        <Link
          to={`/questions/${answer.question_id}`}
          className="question-hyperlink"
        >
          {answer.question.title}
        </Link>
        <div className="prose prose-sm max-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(answer.question.body),
            }}
          />
        </div>
      </div>

      <div>
        <div>Answer</div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationsSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, values }) => (
            <Form>
              <div className="list mb-6">
                <div>
                  <QuillEditor name="body" placeholder="" label="" />
                  <div className="prose prose-sm max-w-full">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(values.body),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !isValid}
                >
                  Save Edits
                </button>

                <button
                  type="reset"
                  className="btn btn-outline border-0 text-blue-500 py-2 hover:bg-blue-50"
                  onClick={() => handleCancelEdit(values)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <UnsavedChangesModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          questionId={answer.question_id}
        />
      </div>
    </div>
  );
};
