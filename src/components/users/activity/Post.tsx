import { FC } from "react";
import { QuestionTags } from "../../questions/QuestionTags";
import moment from "moment";
import { PostData } from "../types";
import { PostTitle } from "../../common/PostTitle";
import { PostAuthor } from "../../common/PostAuthor";
import { PostStats } from "../../common/PostStats";

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
