import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RichTextEditorSkeleton from "../common/RichTextEditorSkeleton";
import ButtonSkeleton from "../common/ButtonSkeleton";
import PostTagsSkeleton from "../posts/PostTagsSkeleton";

const QuestionFormSkeleton = () => {
  return (
    <div className="space-y-6 w-full max-w-[800px]">
      <div>
        <Skeleton width={100} height={20} className="mb-2" />
        <Skeleton className="w-full" height={20} />
      </div>
      <div className="mb-4">
        <RichTextEditorSkeleton />
      </div>
      <Skeleton width={100} height={20} className="mb-2" />
      <PostTagsSkeleton />
      <ButtonSkeleton />
    </div>
  );
};

export default QuestionFormSkeleton;
