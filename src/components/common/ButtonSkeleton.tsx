import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ButtonSkeleton = ({ width = 100, height = 40 }) => {
  return <Skeleton width={width} height={height} borderRadius={4} />;
};

export default ButtonSkeleton;
