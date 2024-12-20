import React from "react";

import { TagsList } from "./TagsList";
import { TagData } from "./types";
import { CustomError } from "../common/CustomError";

interface TagsPageProps {
  tags: TagData[] | undefined;
}

export const TagsPage: React.FC<TagsPageProps> = ({ tags }) => {
  if (!tags) {
    return <CustomError message="No tags found" />;
  }
  return (
    <div className="flex flex-col space-y-4 ">
      <h1 className="text-2xl">Tags</h1>
      <div className="text-sm">
        Tags are keywords or labels associated with questions that allow users
        to easily filter and search for content relevant to their interests or
        areas of expertise. This page showcases a list of all available tags,
        with each tag linking to questions that have been categorized under it.
        Users can explore various tags to find topics they are knowledgeable
        about or wish to learn more about, contributing to discussions and
        answering related questions.
      </div>
      <TagsList tags={tags} />
    </div>
  );
};

export default TagsPage;
