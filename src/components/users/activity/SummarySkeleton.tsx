import Skeleton from "react-loading-skeleton";

import TopItemsCardSkeleton from "../TopItemsCardSkeleton";

const SummarySkeleton = () => {
  return (
    <div className="activity-list">
      <TopItemsCardSkeleton />
      <TopItemsCardSkeleton />
      <TopItemsCardSkeleton />

      <div>
        <div className="flex justify-between items-center mb-2">
          <Skeleton width={100} height={24} />
        </div>
        <div className="activity-card">
          <div className="grid grid-cols-3 text-sm justify-between m-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="">
                <Skeleton width={40} height={20} />
                <Skeleton
                  width={60}
                  height={15}
                  className="mt-1 text-xs text-appGray-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySkeleton;
