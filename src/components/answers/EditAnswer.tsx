import { Link, useNavigate } from "react-router-dom";
import { CustomError } from "../common/CustomError";
import { FullAnswerData } from "./types";
import { type FC, useState } from "react";
import { Formik, Form } from "formik";
// import { QuillEditor } from "../common/QuillEditor";
import * as Yup from "yup";
import { UnsavedChangesModal } from "../common/UnsavedChangesModal";
import { useHighlightCodeBlocks } from "../hooks/useHighlightCodeBlocks";
import { useUpdateAnswerMutation } from "../../services/api";
// import { RichContent } from "../common/RichContent";
// import { removeSelectElement } from "../../services/utils";
import MarkdownEditor from "../common/MarkdownEditor";
import MarkdownViewer from "../common/MarkDownViewer";

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
    // const modifiedBody = removeSelectElement(values.body);
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
        <Link to={`/questions/${answer.question_id}`} className="hyperlink">
          {answer.question.title}
        </Link>
        {/* <RichContent body={removeSelectElement(answer.question.body)} /> */}
        <MarkdownViewer content={answer.question.body} />
      </div>

      <div>
        <div>Answer</div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationsSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            isValid,
            values,
            touched,
            setFieldValue,
            setFieldTouched,
            errors,
          }) => {
            return (
              <Form>
                <div className="list mb-6">
                  <div>
                    <MarkdownEditor
                      value={values.body}
                      onChange={(value) => {
                        setFieldValue("body", value);
                        setFieldTouched("body", true);
                      }}
                    />
                    {touched.body && errors.body && (
                      <div className="text-red-500 text-sm">{errors.body}</div>
                    )}

                    <MarkdownViewer content={values.body} />
                    {/* <QuillEditor name="body" placeholder="" label="" />
                    <RichContent body={removeSelectElement(values.body)} /> */}
                  </div>
                </div>
                <div className="flex flex-col gap-4 ">
                  <button
                    type="submit"
                    className="btn btn-primary "
                    disabled={
                      Object.keys(touched).length === 0 ||
                      isSubmitting ||
                      !isValid
                    }
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
            );
          }}
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
