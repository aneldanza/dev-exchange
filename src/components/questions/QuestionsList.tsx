import React from "react";
import { PostData } from "../posts/types";
import { PostListItem } from "../posts/PostListItem";

interface QuestionsListProps {
  questions: PostData[] | undefined;
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
          <PostListItem key={question.id} post={question} />
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
