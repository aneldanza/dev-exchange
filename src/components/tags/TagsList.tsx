import React from "react";
import { Tag } from "./types";
import { Link } from "react-router-dom";

interface TagsListProps {
  tags: Tag[];
}

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tags.map((tag) => (
        <div key={tag.id} className="flex flex-col border rounded-md p-3">
          <div>
            <Link to={`/tags/${tag.name}`} className="tag">
              {tag.name.toLowerCase()}
            </Link>
          </div>
          <div className="text-xs">{tag.description}</div>
        </div>
      ))}
    </div>
  );
};
