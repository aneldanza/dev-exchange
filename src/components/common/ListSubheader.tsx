import { type FC } from "react";
import { SortTabs } from "./SortTabs";
import { formatCountString } from "../../services/utils";

interface ListSubheaderProps {
  keyword: string;
  sortTabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  count: number;
}

export const ListSubheader: FC<ListSubheaderProps> = ({
  keyword,
  sortTabs,
  selectedTab,
  setSelectedTab,
  count,
}) => {
  return (
    <div className="mb-6 pb-6 border-b subheader-wrap">
      <div className="font-medium text-sm flex shrink-0">
        {formatCountString(count, `${keyword}`, `${keyword}s`)}
      </div>
      <div className="flex text-xs shrink-0">
        <SortTabs
          sortOptions={sortTabs}
          selectedOption={selectedTab}
          setSelectedOption={setSelectedTab}
        />
      </div>
    </div>
  );
};
