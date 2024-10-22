import React from "react";
import moment from "moment";
import { QuestionData } from "./types";

interface QuestionProps {
  question?: QuestionData;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  if (!question) {
    return <div>No question data available.</div>;
  }

  return (
    <div className="question">
      <div>
        <h2 className="question-title">{question.title}</h2>
        <div className="flex gap-4 text-xs sm:text-sm flex-wrap">
          <div className="whitespace-nowrap">{`asked ${moment(
            question.created_at
          ).fromNow()}`}</div>
          <div className="whitespace-nowrap">{`modified ${moment(
            question.updated_at
          ).fromNow()}`}</div>
        </div>
      </div>
      <div className="prose">
        <div dangerouslySetInnerHTML={{ __html: question.body }} />
      </div>
      <div className="tags">
        {question.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};
