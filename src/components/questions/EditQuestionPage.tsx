import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateQuestionMutation,
  useGetQuestionByIdQuery,
} from "../../services/api";
// import { useAuth } from "../../services/storeHooks";
import { QuestionForm } from "./QuestionForm";
import { FormValues } from "./types";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";

const QuestionFormWithErrorAndLoading = withLoading(
  withError(QuestionForm, CustomError),
  CustomLoading
);

const EditQuestionPage: React.FC = () => {
  //   const { user } = useAuth();
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();

  const { data, error, isLoading } = useGetQuestionByIdQuery(questionId || "", {
    refetchOnMountOrArgChange: true,
  });

  const [updateQuestion] = useUpdateQuestionMutation();

  const handleUpdateQuestion = async (data: FormValues) => {
    const formattedTags = data.tags.map((option) => ({
      name: option.label,
      id: option.value,
    }));
    const updatedQuestion = await updateQuestion({
      id: questionId || "",
      title: data.title,
      body: data.body,
      tags: formattedTags,
    }).unwrap();
    console.log(updatedQuestion);

    navigate(`/questions/${updatedQuestion.id}`);
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 flex">Edit Question</h1>
      <QuestionFormWithErrorAndLoading
        questionData={{
          title: data?.title || "",
          body: data?.body || "",
          tags: data?.tags || [],
        }}
        error={error}
        isLoading={isLoading}
        questionAction={handleUpdateQuestion}
        submitText="Update question"
      />
    </div>
  );
};

export default EditQuestionPage;
