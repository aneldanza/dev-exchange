import { useParams } from "react-router-dom";
import { useGetTagByIdQuery } from "../../services/api";
import { TaggedQuestionPage } from "./TaggedQuestionPage";
import { CustomError } from "../common/CustomError";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";
import TaggedQuestionPageSkeleton from "./TaggedQuestionPageSkeleton";

const TaggedQuestionPageWithLoadingAndError = withLoading(
  withError(TaggedQuestionPage, CustomError),
  TaggedQuestionPageSkeleton
);

const TaggedQuestionPageContainer: React.FC = () => {
  const { tagId } = useParams<{ tagId: string }>();
  const { data: tag, isLoading, error } = useGetTagByIdQuery(tagId || "");

  return (
    <>
      <TaggedQuestionPageWithLoadingAndError
        tag={tag}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default TaggedQuestionPageContainer;
