import React from "react";
import moment from "moment";
import { PostTitle } from "../posts/PostTitle";

interface PostItemProps {
  votes: number;
  title: string;
  created_at: string;
  id: number;
  question_id: number | null;
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
        <PostTitle title={title} id={id} question_id={question_id} />
      </div>
      <div className="text-xs flex-shrink-0 whitespace-nowrap">
        {moment(created_at).format("MMM DD, YYYY")}
      </div>
    </div>
  );
};
