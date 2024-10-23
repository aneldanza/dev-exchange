import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Import a highlight.js theme
import { useAuth } from "../../services/storeHooks";
import moment from "moment";
import { QuestionData } from "./types";
import Button from "../common/Button";

interface QuestionProps {
  question?: QuestionData;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (question) {
      document.querySelectorAll(".ql-code-block-container").forEach((block) => {
        block.classList.add("custom-code-block");
      });

      document.querySelectorAll(".ql-code-block").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });

      document.querySelectorAll("code").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });
    }
  }, [question]);

  if (!question) {
    return <div>No question data available.</div>;
  }

  return (
    <div className="">
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
      <div className="max-w-3xl w-full">
        <div className="prose prose-sm max-w-full">
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
            <div className="py-2 flex gap-2">
              <Link to={`/questions/${question.id}/edit`} className="action">
                Edit
              </Link>
              <Button
                title="Delete"
                className="action"
                onClick={() => console.log("Delete")}
              />
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
    </div>
  );
};
