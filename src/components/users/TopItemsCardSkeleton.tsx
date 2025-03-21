import Skeleton from "react-loading-skeleton";
import SortTabsSkeleton from "../common/SortTabsSkeleton";

const TopItemsCardSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Skeleton width={100} height={24} />
        <div className="text-xs">
          <SortTabsSkeleton />
        </div>
      </div>
      <div className="activity-card">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Skeleton width={40} height={40} circle={true} />
            <div className="flex-grow">
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" height={15} className="mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopItemsCardSkeleton;
