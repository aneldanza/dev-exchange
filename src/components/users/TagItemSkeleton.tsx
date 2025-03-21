import Skeleton from "react-loading-skeleton";

const TagItemSkeleton = () => {
  return (
    <div className="activity-card-row items-center">
      <Skeleton width={100} height={20} />
      <div className="text-xs">
        <Skeleton width={50} height={20} />
      </div>
    </div>
  );
};

export default TagItemSkeleton;
