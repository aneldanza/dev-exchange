import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { QuestionData } from "./types";

interface QuestionsListProps {
  questions: QuestionData[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  return (
    <div>
      <ul className="list divide-y">
        {questions.map((question) => (
          <li key={question.id} className="flex flex-col gap-2">
            <Link
              to={`questions/${question.id}`}
              className="text-blue-500 text-sm"
            >
              {question.title}
            </Link>
            <div
              className="text-xs"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  question.body.length > 100
                    ? `${question.body.substring(0, 100)}...`
                    : question.body
                ),
              }}
            />

            <div className="flex gap-1">
              {question.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-xs px-2 py-1 rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
