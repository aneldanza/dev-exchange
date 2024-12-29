import React from "react";
import moment from "moment";

import { PostAuthor } from "./PostAuthor";

interface PostMetaProps {
  createdAt: string;
  username: string | null;
  userId: number | null;
  actionWord: "asked" | "answered";
  theme: "answer-meta" | "question-meta";
}

export const PostMeta: React.FC<PostMetaProps> = ({
  createdAt,
  userId,
  username = "unknown user",
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
      <PostAuthor userId={userId} username={username} />
    </div>
  );
};
