import React from "react";
import { Tag } from "../tags/Tag";
import { TagData } from "../tags/types";

export const QuestionTags: React.FC<{ tags: TagData[] }> = ({ tags }) => (
  <div className="flex gap-2">
    {tags.map((tag, index) => (
      <Tag key={index} tag={tag} />
    ))}
  </div>
);
