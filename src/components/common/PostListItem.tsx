import React from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import { TbMessageQuestion, TbMessageExclamation } from "react-icons/tb";
import { QuestionTags } from "../questions/QuestionTags";
import { PostData } from "../users/types";
import { formatCountString } from "../../services/utils";
import { PostTitle } from "./PostTitle";
import { PostAuthor } from "./PostAuthor";

interface PostListItemProps {
  post: PostData;
}

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <li className="flex flex-col sm:flex-row gap-4 py-3">
      <div className="flex flex-row sm:flex-col gap-4 text-xs sm:text-sm text-appGray-300">
        <div>{formatCountString(post.votes, "vote", "votes")}</div>
        {!!post.answers && (
          <div>{formatCountString(post.answers, "answer", "answers")}</div>
        )}
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex gap-4 items-center">
          <div>
            {post.type === "Question" ? (
              <TbMessageQuestion size={22} color="blue-500" />
            ) : (
              <TbMessageExclamation
                style={{ transform: "scaleX(-1)" }}
                color="green"
                size={22}
              />
            )}
          </div>
          <PostTitle
            title={post.title}
            id={post.id}
            question_id={post.question_id}
          />
        </div>

        <div
          className="text-xs"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              post.body && post.body.length > 100
                ? `${post.body.substring(0, 100)}...`
                : post.body || ""
            ),
          }}
        />

        <QuestionTags tags={post.tags} />

        <div className="self-end text-xs">
          <PostAuthor userId={post.user.id} username={post.user.username} />{" "}
          <span className="text-gray-500">
            {moment(post.created_at).fromNow()}
          </span>
        </div>
      </div>
    </li>
  );
};
