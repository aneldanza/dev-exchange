import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "../tags/types";

interface ActivityTabProps {
  tags: Tag[];
  // Define the props for the ActivityTab component here
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ tags }) => {
  // Implement the logic for the ActivityTab component here

  return (
    <div>
      <div>Tags</div>
      <div className="card flex flex-wrap gap-2">
        {tags.length ? (
          tags.map((tag: Tag) => (
            <Link
              key={tag.id}
              className="tag text-xs"
              to={`/questions/tagged/${tag.id}`}
            >
              {tag.name}
            </Link>
          ))
        ) : (
          <div>No tags found</div>
        )}
      </div>
    </div>
  );
};
