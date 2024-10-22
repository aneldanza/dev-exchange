import React from "react";
import { QuestionData } from "./types";

interface QuestionProps {
  question: QuestionData;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="question">
      <h2>{question.title}</h2>
      <p>{question.body}</p>
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
