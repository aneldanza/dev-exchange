import Skeleton from "react-loading-skeleton";

const CustomDropDownSkeleton = () => {
  return (
    <div className="inline-block">
      <Skeleton width={150} height={40} className="mb-2" />
    </div>
  );
};

export default CustomDropDownSkeleton;
