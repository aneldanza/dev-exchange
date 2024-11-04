import React from "react";
import { TagData } from "../tags/types";
import { Tag } from "../tags/Tag";
import { QuestionData } from "../questions/types";
import moment from "moment";
import { Link } from "react-router-dom";
import { formatCountString } from "../../services/utils";

interface ActivityTabProps {
  tags: TagData[];
  questions: QuestionData[];
  // Define the props for the ActivityTab component here
}

export const ActivityTab: React.FC<ActivityTabProps> = ({
  tags,
  questions,
}) => {
  // Implement the logic for the ActivityTab component here

  return (
    <div className="activity-list">
      <div>
        <div className="mb-2">Questions</div>
        <div className="activity-card">
          {questions.length ? (
            questions.map((question: QuestionData) => (
              <div key={question.id} className="activity-card-row">
                <div className="card px-2 py-0 min-w-10 justify-center text-center">
                  0
                </div>
                <div className="flex-grow overflow-hidden">
                  <Link
                    to={`/questions/${question.id}`}
                    className="text-blue-400 break-words truncate block max-w-full"
                  >
                    {question.title}
                  </Link>
                </div>
                <div className="text-xs flex-shrink-0 whitespace-nowrap">
                  {moment(question.created_at).format("MMM DD, YYYY")}
                </div>
              </div>
            ))
          ) : (
            <div>No questions found</div>
          )}
        </div>
      </div>

      <div className="">
        <div className="mb-2">Tags</div>
        <div className="activity-card">
          {tags.length ? (
            tags.map((tag: TagData) => (
              <div className="activity-card-row" key={tag.id}>
                <Tag key={tag.id} tag={tag} />
                <div className="text-xs">
                  {formatCountString(
                    tag.questions.length,
                    "question",
                    "questions"
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No tags found</div>
          )}
        </div>
      </div>
    </div>
  );
};
