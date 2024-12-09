import { FC } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { QuestionTags } from "./QuestionTags";
import moment from "moment";
import { LimitedQuestionData } from "./types";
import { formatCountString } from "../../services/utils";

interface QuestionItemProps {
  question: LimitedQuestionData;
}

export const QuestionItem: FC<QuestionItemProps> = ({ question }) => {
  return (
    <li className="flex flex-col sm:flex-row gap-4 py-3">
      <div className="flex flex-row sm:flex-col gap-4 text-xs sm:text-sm text-appGray-300">
        <div>{formatCountString(question.votes, "vote", "votes")}</div>
        <div>{formatCountString(question.answers, "answer", "answers")}</div>
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
  );
};
