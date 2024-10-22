import React from "react";
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
      <h2 className="question-title">{question.title}</h2>
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
