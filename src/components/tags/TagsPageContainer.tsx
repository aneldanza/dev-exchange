import TagsPage from "./TagsPage";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import { useGetTagsQuery } from "../../services/api";

const TagsPageWithLoadingAndError = withLoading(
  withError(TagsPage, CustomError),
  CustomLoading
);

export const TagsPageContainer: React.FC = () => {
  const { data, error, isLoading } = useGetTagsQuery(undefined, {
    refetchOnFocus: true,
  });

  return (
    <TagsPageWithLoadingAndError
      tags={data}
      error={error}
      isLoading={isLoading}
    />
  );
};
