import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RichTextEditorSkeleton from "../common/RichTextEditorSkeleton";
import ButtonSkeleton from "../common/ButtonSkeleton";

const EditAnswerSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 text-base">
      <div>
        <Skeleton width={200} height={20} className="mb-4" />

        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="60%" />
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="60%" />
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width="60%" />
      </div>

      <div>
        <Skeleton height={20} width={100} className="mb-4" />

        <div className="flex flex-col gap-4 mb-6">
          <RichTextEditorSkeleton />

          {/* Viewer Area Skeleton */}
          <div className="border border-gray-300 rounded-md p-4">
            <Skeleton height={200} />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <ButtonSkeleton />

          <ButtonSkeleton />
        </div>
      </div>
    </div>
  );
};

export default EditAnswerSkeleton;
