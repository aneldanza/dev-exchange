import Skeleton from "react-loading-skeleton";
import QuestionsListSkeleton from "../common/QuestionsListSkeleton";

const TaggedQuestionPageSkeleton = () => {
  return (
    <div>
      <div className=" pb-6 border-b">
        <h1 className="font-bold text-xl">
          <Skeleton width={100} />
        </h1>
      </div>
      <QuestionsListSkeleton />
    </div>
  );
};

export default TaggedQuestionPageSkeleton;
