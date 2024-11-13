import { type FC } from "react";
import { CommentData } from "./types";

import { Comment } from "./Comment";

interface CommentsListProps {
  comments: CommentData[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="w-full border-y border-appGray-50 divide-y">
      {comments.map((comment) => (
        <div key={comment.id} className="text-xs w-full p-2">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
};
