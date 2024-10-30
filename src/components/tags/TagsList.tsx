import React from "react";
import { Tag } from "./Tag";
import { TagData } from "./types";

interface TagsListProps {
  tags: TagData[];
}

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tags.map((tag) => (
        <div key={tag.id} className="flex flex-col border rounded-md p-3">
          <div>
            <Tag tag={tag} key={tag.id} />
          </div>
          <div className="text-xs">{tag.description}</div>
        </div>
      ))}
    </div>
  );
};
