import React from "react";
import { LimitedQuestionData } from "./types";
import { QuestionItem } from "./QuestionItem";

interface QuestionsListProps {
  questions: LimitedQuestionData[] | undefined;
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="my-4">
        <div className="text-sm">There are no questions found</div>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex flex-col divide-y max-w-2xl">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
