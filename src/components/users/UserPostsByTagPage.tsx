import React from "react";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { useSearchPostsByUserQuery } from "../../services/api";
import { useParams } from "react-router-dom";
import PostsList from "../common/PostsList";
import { Posts } from "./types";

interface UserPostsByTagProps {
  items: Posts;
}

const UserPostsByTag: React.FC<UserPostsByTagProps> = ({ items }) => {
  return (
    <div>
      <PostsList items={items} />
    </div>
  );
};

const UserPostsByTagWithLoadingAndError = withLoading(
  withError(UserPostsByTag, CustomError),
  CustomLoading
);

const UserPostsByTagPage = () => {
  const { userId } = useParams<{
    userId: string;
  }>();
  const searchParams = new URLSearchParams(window.location.search);
  const tag = searchParams.get("tag") || "";

  const { data, error, isLoading } = useSearchPostsByUserQuery({
    id: userId,
    tag: tag,
  });
  return (
    <UserPostsByTagWithLoadingAndError
      isLoading={isLoading}
      error={error}
      items={data || []}
    />
  );
};

export default UserPostsByTagPage;
