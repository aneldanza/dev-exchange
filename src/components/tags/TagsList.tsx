import React from "react";
import moment from "moment";
import { Tag } from "./Tag";
import { LimitedTagData } from "./types";
import { formatCountString } from "../../services/utils";
import { CustomError } from "../common/CustomError";

interface TagsListProps {
  tags: LimitedTagData[] | undefined;
}

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  if (!tags || !tags.length) {
    return <CustomError message="No tags found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tags.map((tag) => (
        <div key={tag.id} className="flex flex-col border rounded-md p-3 gap-3">
          <div>
            <Tag id={tag.id} name={tag.name} key={tag.id} />
          </div>
          {tag.description && <div className="text-xs">{tag.description}</div>}
          <div className="text-xs text-appGray-200 flex justify-between flex-shrink gap-3">
            <div className="">
              {formatCountString(tag.questions.length, "question", "questions")}
            </div>
            <div>{`Created ${moment(tag.created_at).fromNow()}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
