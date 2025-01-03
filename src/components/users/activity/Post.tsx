import { FC } from "react";
import { QuestionTags } from "../../questions/QuestionTags";
import moment from "moment";
import { formatCountString } from "../../../services/utils";
import { PostData } from "../types";
import { PostTitle } from "../../common/PostTitle";
import { PostAuthor } from "../../common/PostAuthor";

interface PostProps {
  post: PostData;
}

export const Post: FC<PostProps> = ({ post }) => {
  return (
    <li className="flex flex-col sm:flex-row gap-4 py-3">
      <div className="flex flex-row sm:flex-col gap-4 text-xs sm:text-sm text-appGray-300">
        <div>{formatCountString(post.votes, "vote", "votes")}</div>
        {post.answers !== null && (
          <div>{formatCountString(post.answers, "answer", "answers")}</div>
        )}
      </div>

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
