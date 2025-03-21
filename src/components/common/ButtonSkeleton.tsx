import Skeleton from "react-loading-skeleton";

const ButtonSkeleton = ({ width = 100, height = 40 }) => {
  return <Skeleton width={width} height={height} borderRadius={4} />;
};

export default ButtonSkeleton;
