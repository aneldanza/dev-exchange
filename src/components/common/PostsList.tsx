import React from "react";
import { Posts } from "../users/types";
import { PostListItem } from "./PostListItem";

interface PostsListProps {
  items: Posts;
}

const PostsList: React.FC<PostsListProps> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="my-4">
        <div className="text-sm">There are no posts found</div>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex flex-col divide-y max-w-2xl">
        {items.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
