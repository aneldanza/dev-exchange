import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ButtonSkeleton from "../common/ButtonSkeleton";

const CommentsContainerSkeleton = () => {
  return (
    <div className="w-full py-4">
      <div>
        <div className="w-full border-y border-appGray-50 divide-y">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="text-xs w-full p-2">
              <div className="comment-body">
                <Skeleton width="80%" height={20} />
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={50} height={20} />
                  <Skeleton width={50} height={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <ButtonSkeleton />
      </div>
    </div>
  );
};

export default CommentsContainerSkeleton;
