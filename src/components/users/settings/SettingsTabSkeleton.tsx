import Skeleton from "react-loading-skeleton";
import CustomDropDownSkeleton from "../../common/CustomDropDownSkeleton";
import RichTextEditorSkeleton from "../../common/RichTextEditorSkeleton";
import PostBodySkeleton from "../../posts/PostBodySkeleton";

import ButtonSkeleton from "../../common/ButtonSkeleton";

const SettingsTabSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 ">
      <div className="flex shrink-0 w-full md:hidden">
        <CustomDropDownSkeleton />
      </div>
      <div className="md:w-1/4 md:max-w-40 min-w-auto hidden md:block">
        <ul className="list space-y-2 text-sm">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className={`tab inactive-tab`} width={100} />
          ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="text-xl font-bold border-b border-b-appGray-50 mb-6 pb-6">
          <div className="list mb-6">
            <RichTextEditorSkeleton />

            <PostBodySkeleton />

            <div className="flex flex-col gap-4">
              <ButtonSkeleton />

              <Skeleton width={100} height={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabSkeleton;
