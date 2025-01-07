import { FC } from "react";
import { PostTags } from "../../posts/PostTags";
import moment from "moment";
import { PostData } from "../../posts/types";
import { PostTitle } from "../../posts/PostTitle";
import { PostAuthor } from "../../posts/PostAuthor";
import { PostStats } from "../../posts/PostStats";

interface PostProps {
  post: PostData;
}

export const Post: FC<PostProps> = ({ post }) => {
  return (
    <li className="flex flex-col sm:flex-row gap-4 py-3">
      <PostStats post={post} />

      <div className="flex flex-col gap-2 flex-grow">
        <PostTitle
          title={post.title}
          id={post.id}
          question_id={post.question_id}
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
