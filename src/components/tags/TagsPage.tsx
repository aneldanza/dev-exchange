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
      <div className="flex flex-col space-y-4 ">
        <h1 className="text-2xl">Tags</h1>
        <div className="text-sm">
          Tags are keywords or labels associated with questions that allow users
          to easily filter and search for content relevant to their interests or
          areas of expertise. This page showcases a list of all available tags,
          with each tag linking to questions that have been categorized under
          it. Users can explore various tags to find topics they are
          knowledgeable about or wish to learn more about, contributing to
          discussions and answering related questions.
        </div>
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
