import { Link } from "react-router-dom";

import { FC } from "react";
import { TagData } from "./types";

interface TagProps {
  tag: TagData;
}

export const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <Link to={`/questions/tagged/${tag.id}`} className="tag">
      {tag.name.toLowerCase()}
    </Link>
  );
};
