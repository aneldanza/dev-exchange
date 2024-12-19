import { Link } from "react-router-dom";
import { FC } from "react";

interface PostAuthorProps {
  userId: number | null;
  username: string | null;
}

export const PostAuthor: FC<PostAuthorProps> = ({ userId, username }) => {
  return (
    <span className="hyperlink">
      {userId ? (
        <Link to={`/users/${userId}`}>{username}</Link>
      ) : (
        "deleted user"
      )}
    </span>
  );
};
