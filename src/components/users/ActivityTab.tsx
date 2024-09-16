import React from "react";
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
      <div className="card flex flex-wrap">
        {tags.length ? (
          tags.map((tag: Tag) => (
            <div key={tag.id} className="tag text-xs">
              {tag.name}
            </div>
          ))
        ) : (
          <div>No tags found</div>
        )}
      </div>
    </div>
  );
};
