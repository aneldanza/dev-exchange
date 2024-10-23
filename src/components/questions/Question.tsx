import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/storeHooks";
import moment from "moment";
import { QuestionData } from "./types";

interface QuestionProps {
  question?: QuestionData;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { user } = useAuth();

  if (!question) {
    return <div>No question data available.</div>;
  }

  return (
    <div className="question">
      <div className="border-b py-4">
        <h2 className="question-title ">{question.title}</h2>
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
          <span key={index} className="tag text-xs">
            {tag.name}
          </span>
        ))}
      </div>
      <div className="my-4">
        {user && question.user.id === user.id && (
          <div className="py-2">
            <Link
              to={`/questions/${question.id}/edit`}
              className=" text-appGray-300 hover:text-appGray-400 text-xs italic"
            >
              Edit
            </Link>
          </div>
        )}

        <div className="flex justify-end">
          <div className="card bg-blue-100 text-xs text-appGray-400 p-2 border-blue-100">
            <div>{`asked ${moment(question.created_at).format(
              "MMM DD [at] HH:mm"
            )}`}</div>
            <div>
              <Link
                to={`/users/${question.user.id}`}
                className="text-blue-400 hover:text-blue-500"
              >
                {question.user.username}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
