import React from "react";
import { Tag } from "../tags/Tag";
import { RawTagData } from "../tags/types";

export const PostTags: React.FC<{ tags: RawTagData[] }> = ({ tags }) => (
  <div className="flex gap-2">
    {tags.map((tag, index) => (
      <Tag key={index} id={tag.id} name={tag.name} />
    ))}
  </div>
);
