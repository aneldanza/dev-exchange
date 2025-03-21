import { useParams } from "react-router-dom";
import { useGetAnswerByIdQuery } from "../../services/api";
import { CustomError } from "../common/CustomError";
import EditAnswerSkeleton from "./EditAnswerSkeleton";
import withLoading from "../hoc/withLoading";
import withError from "../hoc/withError";
import { EditAnswer } from "./EditAnswer";

const EditAnswerWithErrorAndLoading = withLoading(
  withError(EditAnswer, CustomError),
  EditAnswerSkeleton
);

const EditAnswerPage = () => {
  const { answerId } = useParams<{ answerId: string }>();
  const {
    data: answer,
    isLoading,
    error,
  } = useGetAnswerByIdQuery(answerId, { refetchOnMountOrArgChange: true });

  return (
    <div>
      <EditAnswerWithErrorAndLoading
        answer={answer}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default EditAnswerPage;
