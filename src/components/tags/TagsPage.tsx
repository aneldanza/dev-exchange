import { TagsList } from "./TagsList";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { useGetTagsQuery } from "../../services/api";

const TagsListWithLoadingAndError = withLoading(
  withError(TagsList, CustomError),
  CustomLoading
);

export const TagsPage: React.FC = () => {
  const { data, error, isLoading } = useGetTagsQuery(undefined, {
    refetchOnFocus: true,
  });

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
      <TagsListWithLoadingAndError
        tags={data}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};
