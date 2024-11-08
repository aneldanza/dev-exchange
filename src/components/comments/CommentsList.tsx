import { type FC } from "react";
import { CommentData } from "./types";
import { Link } from "react-router-dom";
import moment from "moment";

interface CommentsListProps {
  comments: CommentData[];
}

export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="w-full border-y border-appGray-50 divide-y">
      {comments.map((comment) => (
        <div key={comment.id} className="text-xs w-full p-2">
          <div className="comment-body">
            <span>{comment.body}</span> - {""}
            <span>
              {comment.user.id ? (
                <Link className="hyperlink" to={`/users/${comment.user.id}`}>
                  {comment.user.username}
                </Link>
              ) : (
                "Anonymous"
              )}
            </span>{" "}
            <span className="text-appGray-200">
              {moment(comment.created_at).fromNow()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
