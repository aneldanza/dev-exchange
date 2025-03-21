import Skeleton from "react-loading-skeleton";

const UserProfileSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid">
        <div>
          <Skeleton width={200} height={30} className="mb-4" />
          <div className="flex gap-1 text-appGray-100">
            <Skeleton circle={true} height={16} width={16} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton width={80} height={30} className="tab inactive-tab" />
        <Skeleton width={80} height={30} className="tab inactive-tab" />
        <Skeleton width={80} height={30} className="tab inactive-tab" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
