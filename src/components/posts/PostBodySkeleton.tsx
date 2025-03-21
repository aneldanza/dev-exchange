import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostBodySkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton height={20} width="80%" />
      <Skeleton height={20} width="60%" />
      <Skeleton height={20} width="80%" />
      <Skeleton height={20} width="60%" />
      <Skeleton height={20} width="80%" />
      <Skeleton height={20} width="60%" />
    </div>
  );
};

export default PostBodySkeleton;
