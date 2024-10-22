import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetQuestionByIdQuery } from "../../services/api";
import { Question } from "./Question";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import Button from "../common/Button";

const QuestionWithLoadingAndError = withLoading(
  withError(Question, CustomError),
  CustomLoading
);

const QuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();
  const { data, error, isLoading } = useGetQuestionByIdQuery(questionId || "", {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      <div className="flex justify-end mb-8">
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
