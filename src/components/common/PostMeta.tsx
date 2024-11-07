import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

interface PostMetaProps {
  createdAt: string;
  username: string;
  userId: number;
  actionWord: "asked" | "answered";
  theme: "answer-meta" | "question-meta";
}

export const PostMeta: React.FC<PostMetaProps> = ({
  createdAt,
  userId,
  username,
  actionWord,
  theme,
}) => {
  return (
    <div className={`card text-xs text-appGray-400 p-2 ${theme}`}>
      <div className="post-meta-date">
        {`${actionWord} ${
          actionWord === "asked"
            ? moment(createdAt).format("MMM DD [at] HH:mm")
            : moment(createdAt).fromNow()
        }`}
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
