import Skeleton from "react-loading-skeleton";
import CustomDropDownSkeleton from "../../common/CustomDropDownSkeleton";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import SummarySkeleton from "./SummarySkeleton";
import ItemsTabSkeleton from "./ItemsTabSkeleton";
import PostSkeleton from "./PostSkeleton";
import TagItemSkeleton from "../TagItemSkeleton";

const ActivityTabSkeleton = () => {
  const { activeTab } = useContext(UserContext);
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex shrink-0 w-full md:hidden">
        <CustomDropDownSkeleton />
      </div>
      <div className="md:w-1/4 md:max-w-40 hidden md:block shrink-0 min-w-auto">
        <ul className="list space-y-2 text-sm ">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={`tab ${"inactive-tab"}`} />
          ))}
        </ul>
      </div>
      <div className="w-full">
        {activeTab === "summary" && <SummarySkeleton />}
        {activeTab === "questions" && <ItemsTabSkeleton item={PostSkeleton} />}
        {activeTab === "answers" && <ItemsTabSkeleton item={PostSkeleton} />}
        {activeTab === "tags" && <ItemsTabSkeleton item={TagItemSkeleton} />}
      </div>
    </div>
  );
};

export default ActivityTabSkeleton;
