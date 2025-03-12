// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostListItemSkeleton from "../posts/PostListItemSkeleton";

const QuestionsListSkeleton = () => {
  return (
    <div className="flex flex-col divide-y w-full">
      <PostListItemSkeleton />
      <PostListItemSkeleton />
      <PostListItemSkeleton />
    </div>
  );
};

export default QuestionsListSkeleton;
