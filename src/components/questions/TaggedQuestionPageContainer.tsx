import { useParams } from "react-router-dom";
import { useGetTagByIdQuery } from "../../services/api";
import { TaggedQuestionPage } from "./TaggedQuestionPage";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import withError from "../hoc/withError";
import withLoading from "../hoc/withLoading";

const TaggedQuestionPageWithLoadingAndError = withLoading(
  withError(TaggedQuestionPage, CustomError),
  CustomLoading
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
