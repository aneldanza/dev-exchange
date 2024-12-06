import React from "react";

interface PostsProps<T> {
  posts: T[];
  renderItem: (item: T) => React.ReactNode;
  label: string;
}

export const Posts = <T,>({ posts, label, renderItem }: PostsProps<T>) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg">
          {posts.length} {label}
        </div>
      </div>
      <div className="activity-card px-4">
        {posts.length ? (
          posts.map((item, index) => <div key={index}>{renderItem(item)}</div>)
        ) : (
          <div>{`No posts found`}</div>
        )}
      </div>
    </div>
  );
};
