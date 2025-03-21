import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostTagsSkeleton = () => {
  return (
    <div className="flex gap-2 ">
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={60} height={20} />
    </div>
  );
};

export default PostTagsSkeleton;
