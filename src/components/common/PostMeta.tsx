import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

interface PostMetaProps {
  createdAt: string;
  username: string;
  userId: number;
  actionWord: string;
}

export const PostMeta: React.FC<PostMetaProps> = ({
  createdAt,
  userId,
  username,
  actionWord,
}) => {
  return (
    <div className="card bg-blue-100 text-xs text-appGray-400 p-2 border-blue-100">
      <div className="post-meta-date">
        {`${actionWord} ${moment(createdAt).format("MMM DD [at] HH:mm")}`}
      </div>
      <div className="post-meta-author">
        {userId ? (
          <Link
            to={`/users/${userId}`}
            className="text-blue-400 hover:text-blue-500"
          >
            {username}
          </Link>
        ) : (
          <span className="text-appGray-300">deleted user</span>
        )}
      </div>
    </div>
  );
};
