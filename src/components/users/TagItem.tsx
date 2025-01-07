import { FC } from "react";
import { Tag } from "../tags/Tag";
import { formatCountString } from "../../services/utils";
import { TagData } from "../tags/types";

interface TagItemProps {
  tag: TagData;
  userId: number;
  postsCount: number;
}

export const TagItem: FC<TagItemProps> = ({ tag, userId, postsCount }) => {
  return (
    <div className="activity-card-row items-center" key={tag.id}>
      <Tag
        key={tag.id}
        id={tag.id}
        name={tag.name}
        url={`/users/${userId}/search?tag=${tag.name}`}
      />
      <div className="text-xs">
        {formatCountString(postsCount, "post", "posts")}
      </div>
    </div>
  );
};
