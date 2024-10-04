import React from "react";
import { useGetAllQuestionsQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import QuestionsList from "./QuestionsList";

const QuestionsListWithErrorAndLoading = withLoading(
  withError(QuestionsList, CustomError),
  CustomLoading
);

const AllQuestionsPage: React.FC = () => {
  const { data, error, isLoading } = useGetAllQuestionsQuery(undefined);
  return (
    <div>
      <h1>All Questions</h1>
      <QuestionsListWithErrorAndLoading
        questions={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AllQuestionsPage;
