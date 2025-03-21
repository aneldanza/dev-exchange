import Skeleton from "react-loading-skeleton";
import SortTabsSkeleton from "../../common/SortTabsSkeleton";

interface ItemsTabSkeletonProps {
  item: () => JSX.Element;
}

const ItemsTabSkeleton = ({ item }: ItemsTabSkeletonProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Skeleton width={100} height={24} />
        <div className="text-xs">
          <SortTabsSkeleton />
        </div>
      </div>
      {
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2"></div>
          <div className="activity-card px-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>{item()}</div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default ItemsTabSkeleton;
