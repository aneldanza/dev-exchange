import Skeleton from "react-loading-skeleton";

const TagsListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col border rounded-md p-3 gap-3">
          <Skeleton width={100} height={20} />

          <div className="text-xs text-appGray-200 flex justify-between flex-shrink gap-3">
            <div className="">
              <Skeleton width={80} height={15} />
            </div>
            <div>
              <Skeleton width={60} height={15} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagsListSkeleton;
