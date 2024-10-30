import React from "react";
import { TagData } from "../tags/types";
import { Tag } from "../tags/Tag";

interface ActivityTabProps {
  tags: TagData[];
  // Define the props for the ActivityTab component here
}

export const ActivityTab: React.FC<ActivityTabProps> = ({ tags }) => {
  // Implement the logic for the ActivityTab component here

  return (
    <div>
      <div>Tags</div>
      <div className="card flex flex-wrap gap-2">
        {tags.length ? (
          tags.map((tag: TagData) => <Tag key={tag.id} tag={tag} />)
        ) : (
          <div>No tags found</div>
        )}
      </div>
    </div>
  );
};
