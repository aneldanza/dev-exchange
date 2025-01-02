import { FC } from "react";
import { Link } from "react-router-dom";

interface TagProps {
  id: number;
  name: string;
  url?: string;
}

export const Tag: FC<TagProps> = ({ id, name, url }) => {
  return (
    <Link to={url ? url : `/questions/tagged/${id}`} className="tag text-xs">
      {name.toLowerCase()}
    </Link>
  );
};
