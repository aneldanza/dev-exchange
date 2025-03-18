import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostTitleSkeleton = () => {
  return <Skeleton width={200} height={20} className="mb-4" />;
};

export default PostTitleSkeleton;
