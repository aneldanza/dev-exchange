import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuestionByIdQuery } from "../../services/api";
import { type QuestionData } from "./types";
import { Question } from "./Question";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";

const QuestionWithLoadingAndError = withLoading(
  withError<{ question: QuestionData }>(Question, CustomError),
  CustomLoading
);

const QuestionPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const { data, error, isLoading } = useGetQuestionByIdQuery(
    Number(questionId),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div>
      <h1>Question Page</h1>
      <QuestionWithLoadingAndError
        question={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QuestionPage;
