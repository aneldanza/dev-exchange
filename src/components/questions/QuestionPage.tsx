import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetQuestionByIdQuery } from "../../services/api";
import { Question } from "./Question";
import { CustomError } from "../common/CustomError";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import Button from "../common/Button";
import QuestionSkeleton from "./QuestionSkeleton";

const QuestionWithLoadingAndError = withLoading(
  withError(Question, CustomError),
  QuestionSkeleton
);

const QuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();
  const { data, error, isLoading } = useGetQuestionByIdQuery(questionId || "", {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Ask a question"
          className="btn btn-primary"
          onClick={() => navigate("/questions/new")}
        />
      </div>
      <QuestionWithLoadingAndError
        question={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QuestionPage;
