import { TagData } from "../tags/types";
import { CustomError } from "../common/CustomError";
import QuestionsList from "./QuestionsList";

interface TaggedQuestionPageProps {
  tag: TagData | undefined;
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
      <div className=" pb-6 border-b">
        <h1 className="font-bold text-xl">{`[${tag.name}]`}</h1>
      </div>
      <QuestionsList questions={tag.questions || []} />
    </div>
  );
};
