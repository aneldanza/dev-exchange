import { Tag } from "../tags/types";
import { CustomError } from "../common/CustomError";
import QuestionsList from "./QuestionsList";

interface TaggedQuestionPageProps {
  tag: Tag | undefined;
  // Define the props for the TaggedQuestionPage component here
}

export const TaggedQuestionPage: React.FC<TaggedQuestionPageProps> = ({
  tag,
}) => {
  if (!tag) {
    return <CustomError message="Tag not found" />;
  }

  return (
    <div>
      <h1>{`[${tag.name}]`}</h1>
      <QuestionsList questions={tag.questions || []} />
    </div>
  );
};
