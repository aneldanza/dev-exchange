import Skeleton from "react-loading-skeleton";
import TopItemsCardSkeleton from "../TopItemsCardSkeleton";
import PostBodySkeleton from "../../posts/PostBodySkeleton";

const ProfileTabSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0">
      <div className="flex flex-col space-y-4">
        <div>
          <div className="text-lg">
            <Skeleton width={50} />
          </div>
          <div className="card">
            <div className="flex gap-4">
              <div className="list">
                <Skeleton width={30} height={20} />
                <Skeleton
                  width={60}
                  height={15}
                  className="mt-1 text-xs text-appGray-100"
                />
              </div>
              <div className="list">
                <Skeleton width={30} height={20} />
                <Skeleton
                  width={60}
                  height={15}
                  className="mt-1 text-xs text-appGray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 flex-grow">
        <div>
          <div className="text-lg mb-2">
            <Skeleton width={100} />
          </div>

          <div className="card">
            <PostBodySkeleton />
          </div>
        </div>

        <TopItemsCardSkeleton />
      </div>
    </div>
  );
};

export default ProfileTabSkeleton;
