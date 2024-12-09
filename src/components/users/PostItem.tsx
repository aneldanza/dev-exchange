import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

interface PostItemProps {
  votes: number;
  title: string;
  created_at: string;
  id: number | null;
  question_id: number;
}

export const PostItem: React.FC<PostItemProps> = ({
  votes,
  title,
  id,
  question_id,
  created_at,
}) => {
  return (
    <div className="activity-card-row">
      <div className="card px-2 py-0 min-w-10 justify-center text-center">
        {votes}
      </div>
      <div className="flex-grow overflow-hidden">
        <Link
          to={`/questions/${question_id}${id ? "?answerId=" + id : ""}`}
          className="text-blue-400 break-words truncate block max-w-full"
        >
          {title}
        </Link>
      </div>
      <div className="text-xs flex-shrink-0 whitespace-nowrap">
        {moment(created_at).format("MMM DD, YYYY")}
      </div>
    </div>
  );
};
