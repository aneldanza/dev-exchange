import { useParams } from "react-router-dom";
import { useGetAnswerByIdQuery } from "../../services/api";
import { CustomError } from "../common/CustomError";

import { CustomLoading } from "../common/CustomLoading";
import withLoading from "../hoc/withLoading";
import withError from "../hoc/withError";
import { EditAnswer } from "./EditAnswer";

const EditAnswerWithErrorAndLoading = withLoading(
  withError(EditAnswer, CustomError),
  CustomLoading
);

const EditAnswerPage = () => {
  const { answerId } = useParams<{ answerId: string }>();
  const { data: answer, isLoading, error } = useGetAnswerByIdQuery(answerId);

  return (
    <div>
      <h1>Edit Answer</h1>
      <EditAnswerWithErrorAndLoading
        answer={answer}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default EditAnswerPage;
