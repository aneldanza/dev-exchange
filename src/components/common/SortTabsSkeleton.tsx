import Skeleton from "react-loading-skeleton";

const SortTabsSkeleton = () => {
  return (
    <div className="flex gap-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <Skeleton width={50} height={20} />
        </div>
      ))}
    </div>
  );
};

export default SortTabsSkeleton;
