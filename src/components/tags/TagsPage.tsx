import React from "react";
import { useGetTagsQuery } from "../../services/api";

export interface Tag {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

export const TagsPage: React.FC = () => {
  const {
    data: tags,
    error,
    isLoading,
    isSuccess,
  } = useGetTagsQuery(undefined, { refetchOnFocus: true });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error</div>;
  } else if (isSuccess && tags) {
    return (
      <div>
        <h1>Tags</h1>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              <a href={`/tags/${tag.name}`}>{tag.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default TagsPage;
