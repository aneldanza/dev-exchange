import Skeleton from "react-loading-skeleton";

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
