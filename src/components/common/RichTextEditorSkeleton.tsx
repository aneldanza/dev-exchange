import Skeleton from "react-loading-skeleton";

const RichTextEditorSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Editor Area Skeleton */}
      <div className="border border-gray-300 rounded-md p-4">
        {/* Toolbar Skeleton */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} width={30} height={20} />
          ))}
        </div>
        <Skeleton height={200} />
      </div>
    </div>
  );
};

export default RichTextEditorSkeleton;
