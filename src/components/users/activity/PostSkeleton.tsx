import Skeleton from "react-loading-skeleton";
import PostStatsSkeleton from "../../posts/PostStatsSkeleton";
import PostTitleSkeleton from "../../posts/PostTitleSkeleton";
import PostTagsSkeleton from "../../posts/PostTagsSkeleton";

const PostSkeleton = () => {
  return (
    <li className="flex flex-col sm:flex-row gap-4 py-3">
      <PostStatsSkeleton />

      <div className="flex flex-col gap-2 flex-grow">
        <PostTitleSkeleton />

        <PostTagsSkeleton />

        <div className="self-end text-xs">
          <Skeleton width={100} height={20} />
        </div>
      </div>
    </li>
  );
};

export default PostSkeleton;
