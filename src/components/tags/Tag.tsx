import { Link } from "react-router-dom";

import { FC } from "react";
import { TagData } from "./types";

interface TagProps {
  tag: TagData;
  url?: string;
}

export const Tag: FC<TagProps> = ({ tag, url }) => {
  return (
    <Link
      to={url ? url : `/questions/tagged/${tag.id}`}
      className="tag text-xs"
    >
      {tag.name.toLowerCase()}
    </Link>
  );
};
