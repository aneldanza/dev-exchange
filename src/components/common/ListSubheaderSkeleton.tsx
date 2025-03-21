import Skeleton from "react-loading-skeleton";
import SortTabsSkeleton from "./SortTabsSkeleton";

const ListSubheaderSkeleton = () => {
  return (
    <div className="mb-6 pb-6 border-b subheader-wrap">
      <div className="font-medium text-sm flex shrink-0">
        <Skeleton width={100} />
      </div>
      <div className="flex text-xs shrink-0">
        <SortTabsSkeleton />
      </div>
    </div>
  );
};

export default ListSubheaderSkeleton;
