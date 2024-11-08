import { type FC } from "react";
import { CommentData } from "./types";

interface CommentsListProps {
  comments: CommentData[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="w-full py-4">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-body">{comment.body}</div>
          <div className="comment-user">
            {comment.user.username ? comment.user.username : "Anonymous"}
          </div>
        </div>
      ))}
    </div>
  );
};
