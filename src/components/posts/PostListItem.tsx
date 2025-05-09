import React from "react";
import moment from "moment";
import { TbMessageQuestion, TbMessageExclamation } from "react-icons/tb";
import { PostTags } from "./PostTags";
import { PostData } from "./types";
import { PostTitle } from "./PostTitle";
import { PostAuthor } from "./PostAuthor";
import { PostStats } from "./PostStats";
import MarkdownViewer from "../common/MarkDownViewer";

interface PostListItemProps {
  post: PostData;
  showPostTypeIcon?: boolean;
}

export const PostListItem: React.FC<PostListItemProps> = ({
  post,
  showPostTypeIcon,
}) => {
  return (
    <li className="flex flex-col lg:flex-row gap-4 py-3">
      <PostStats post={post} />

      <div className="flex flex-col gap-2 flex-grow lg:max-w-[calc(100%-124px)]">
        <div className="flex gap-4 items-center">
          {showPostTypeIcon && (
            <div>
              {post.type === "Question" ? (
                <TbMessageQuestion size={22} color="text-blue-500" />
              ) : (
                <TbMessageExclamation
                  style={{ transform: "scaleX(-1)" }}
                  color="text-green-500"
                  size={22}
                />
              )}
            </div>
          )}
          <PostTitle
            title={post.title}
            id={post.id}
            question_id={post.question_id}
          />
        </div>

        <div className="line-clamp-2">
          <MarkdownViewer content={post.body} />
        </div>

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
