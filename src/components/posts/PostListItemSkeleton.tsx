import Skeleton from "react-loading-skeleton";
import PostStatsSkeleton from "./PostStatsSkeleton";

const PostListItemSkeleton = () => {
  return (
    <li className="flex flex-col lg:flex-row gap-4 py-3">
      <PostStatsSkeleton />

      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex gap-4 items-center">
          <Skeleton width={200} height={20} />
        </div>

        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="60%" />

        <div className="flex gap-2">
          <Skeleton width={50} height={20} />
          <Skeleton width={50} height={20} />
          <Skeleton width={50} height={20} />
        </div>

        <div className="self-end text-xs">
          <Skeleton width={100} height={20} />
        </div>
      </div>
    </li>
  );
};

export default PostListItemSkeleton;
