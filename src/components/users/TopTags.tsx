import React, { useMemo } from "react";
import { formatCountString } from "../../services/utils";
import { TagData } from "../tags/types";
import { Tag } from "../tags/Tag";
import { QuestionData } from "../questions/types";
import { UserAnswerData } from "./types";

interface TopTagsProps {
  tags: Record<
    string,
    { tag: TagData; posts: (QuestionData | UserAnswerData)[] }
  >;
  userId: number;
}

export const TopTags: React.FC<TopTagsProps> = ({ tags, userId }) => {
  const sortedTags = useMemo(
    () => Object.values(tags).sort((a, b) => b.posts.length - a.posts.length),
    [tags]
  );

  const topFiveTags = useMemo(() => sortedTags.slice(0, 5), [sortedTags]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg">Top Tags</div>
        {sortedTags.length > topFiveTags.length && (
          <div className="text-xs text-appGray-100">View all tags</div>
        )}
      </div>
      <div className="activity-card">
        {topFiveTags.length ? (
          topFiveTags.map((tag) => (
            <div className="activity-card-row items-center" key={tag.tag.id}>
              <Tag
                key={tag.tag.id}
                tag={tag.tag}
                url={`/users/${userId}/search?tag=${tag.tag.name}`}
              />
              <div className="text-xs">
                {formatCountString(tag.posts.length, "post", "posts")}
              </div>
            </div>
          ))
        ) : (
          <div>No tags found</div>
        )}
      </div>
    </div>
  );
};
