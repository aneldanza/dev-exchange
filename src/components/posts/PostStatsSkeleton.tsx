import Skeleton from "react-loading-skeleton";

const PostStatsSkeleton = () => {
  return (
    <div className="flex flex-row lg:flex-col gap-4 min-w-[108px] sm:text-smitems-center lg:items-end ">
      <Skeleton width={50} height={20} />
      <Skeleton width={50} height={20} />
    </div>
  );
};

export default PostStatsSkeleton;
