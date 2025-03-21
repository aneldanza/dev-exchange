import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostVoteSectionSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton width={34} height={34} circle />
      <div className="text-xl">
        <Skeleton width={20} />
      </div>
      <Skeleton width={34} height={34} circle />
    </div>
  );
};

export default PostVoteSectionSkeleton;
