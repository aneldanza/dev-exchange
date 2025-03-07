import React from "react";
import { formatCountString } from "../../services/utils";
import { PostData } from "./types";

interface PostStatsProps {
  post: PostData;
}

export const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  return (
    <div className="flex flex-row lg:flex-col gap-4 text-xs min-w-[108px] sm:text-sm text-appGray-300 items-center lg:items-end ">
      <div>{formatCountString(post.votes, "vote", "votes")}</div>
      {post.answers ? (
        <div
          className={
            post.answers.accepted ? "accepted-answer" : "no-accepted-answer"
          }
        >
          {formatCountString(post.answers.count, "answer", "answers")}
        </div>
      ) : post.accepted ? (
        <div className="accepted-answer">Accepted</div>
      ) : null}
    </div>
  );
};
