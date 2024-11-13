import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { LimitedQuestionData } from "./types";
import { QuestionTags } from "./QuestionTags";
import moment from "moment";

interface QuestionsListProps {
  questions: LimitedQuestionData[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  if (!questions.length) {
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
          <li key={question.id} className="flex gap-4 py-3">
            <div className="flex flex-col gap-4 text-xs sm:text-sm text-appGray-300">
              <div>{`${question.votes} votes`}</div>
              <div>{`${question.answers} answers`}</div>
            </div>

            <div className="flex flex-col gap-2 flex-grow">
              <Link
                to={`/questions/${question.id}`}
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

              <QuestionTags tags={question.tags} />

              <div className="self-end text-xs">
                <span className="hyperlink">
                  {question.user.id ? (
                    <Link to={`/users/${question.user.id}`}>
                      {question.user.username}
                    </Link>
                  ) : (
                    "deleted user"
                  )}
                </span>{" "}
                <span className="text-gray-500">
                  {moment(question.created_at).fromNow()}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
