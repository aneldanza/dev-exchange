import Skeleton from "react-loading-skeleton";

const UsersListSkeleton = () => {
  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="flex gap-3 cursor-pointer">
            <Skeleton circle={true} height={50} width={50} />
            <div className="space-y-1 font-medium text-appGray-500">
              <Skeleton width={100} height={20} />
              <Skeleton
                width={150}
                height={15}
                className="text-sm text-gray-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersListSkeleton;
