import React from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import { TbMessageQuestion, TbMessageExclamation } from "react-icons/tb";
import { PostTags } from "./PostTags";
import { PostData } from "./types";
import { PostTitle } from "./PostTitle";
import { PostAuthor } from "./PostAuthor";
import { PostStats } from "./PostStats";

interface PostListItemProps {
  post: PostData;
}

export const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  return (
    <li className="flex flex-col sm:flex-row gap-4 py-3">
      <PostStats post={post} />

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

        <PostTags tags={post.tags} />

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
