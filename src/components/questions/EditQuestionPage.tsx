import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateQuestionMutation,
  useGetQuestionByIdQuery,
} from "../../services/api";
import { QuestionForm } from "./QuestionForm";

import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import PostTitleSkeleton from "../posts/PostTitleSkeleton";
import QuestionFormSkeleton from "./QuestionFormSkeleton";

const QuestionFormWithErrorAndLoading = withLoading(
  withError(QuestionForm, CustomError),
  QuestionFormSkeleton
);

const EditQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();

  const { data, error, isLoading } = useGetQuestionByIdQuery(questionId || "", {
    refetchOnMountOrArgChange: true,
  });

  const [updateQuestion] = useUpdateQuestionMutation();

  const handleUpdateQuestion = async (data: {
    title: string;
    body: string;
    tags: { name: string; id: number }[];
  }) => {
    const updatedQuestion = await updateQuestion({
      id: questionId || "",
      title: data.title,
      body: data.body,
      tags: data.tags,
    }).unwrap();
    console.log(updatedQuestion);

    navigate(`/questions/${updatedQuestion.id}`);
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 flex">
        {isLoading ? <PostTitleSkeleton /> : "Edit Question"}
      </h1>
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
