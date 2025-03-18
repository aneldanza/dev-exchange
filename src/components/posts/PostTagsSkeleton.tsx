import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostTagsSkeleton = () => {
  return (
    <div>
      <Skeleton width={100} height={20} className="mb-2" />
      <div className="flex gap-2 border rounded-md p-2">
        <Skeleton width={60} height={20} />
        <Skeleton width={60} height={20} />
        <Skeleton width={60} height={20} />
      </div>
    </div>
  );
};

export default PostTagsSkeleton;
