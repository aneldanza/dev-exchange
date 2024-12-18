import { FC } from "react";
import { Link } from "react-router-dom";
import { QuestionTags } from "../../questions/QuestionTags";
import moment from "moment";
import { formatCountString } from "../../../services/utils";
import { PostData } from "../types";

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
        <Link
          to={
            post.question_id
              ? `/questions/${post.question_id}?answerId=${post.id}`
              : `/questions/${post.id}`
          }
          className="text-blue-500 text-sm"
        >
          {post.title}
        </Link>

        <QuestionTags tags={post.tags} />

        <div className="self-end text-xs">
          <span className="hyperlink">
            {post.user.id ? (
              <Link to={`/users/${post.user.id}`}>{post.user.username}</Link>
            ) : (
              "deleted user"
            )}
          </span>{" "}
          <span className="text-gray-500">
            {moment(post.created_at).fromNow()}
          </span>
        </div>
      </div>
    </li>
  );
};
