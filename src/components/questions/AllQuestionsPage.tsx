import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestionsQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import QuestionsList from "./QuestionsList";
import Button from "../common/Button";

const QuestionsListWithErrorAndLoading = withLoading(
  withError(QuestionsList, CustomError),
  CustomLoading
);

const AllQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllQuestionsQuery(undefined);
  return (
    <div>
      <div className="flex justify-between mb-6 pb-6 border-b">
        <h1 className="text-xl">All Questions</h1>
        <Button
          title="Ask a Question"
          onClick={() => navigate("/questions/new")}
          className="btn btn-primary"
        />
      </div>
      <QuestionsListWithErrorAndLoading
        questions={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AllQuestionsPage;
