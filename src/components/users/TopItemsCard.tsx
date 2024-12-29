import React, { useMemo, useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalize, sortItems } from "../../services/utils";
import { UserContext } from "./UserContext";
import { SortTabs } from "../common/SortTabs";

interface TopTagsProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  name: string;
  sortOptions?: string[];
}

export const TopItemsCard = <T,>({
  items,
  renderItem,
  name,
  sortOptions = [],
}: TopTagsProps<T>) => {
  const { userId } = useParams();
  const { setActiveTab } = useContext(UserContext);
  const [sortTab, setSortTab] = useState<string>(sortOptions[0]);
  const [sortedItems, setSortedItems] = useState<T[]>(items);
  const topFiveItems = useMemo(() => sortedItems.slice(0, 5), [sortedItems]);

  useEffect(() => {
    const sorted = sortItems(items, sortTab);
    setSortedItems(sorted);
  }, [sortTab, items]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg">{`${capitalize(name)}s`}</div>
        {sortedItems.length > topFiveItems.length ? (
          <Link
            to={`/users/${userId}?tab=${name}s`}
            className="text-xs text-appGray-100"
            onClick={() => setActiveTab("activity")}
          >{`View all ${name}s`}</Link>
        ) : (
          <div className="text-xs">
            <SortTabs
              setSelectedOption={setSortTab}
              selectedOption={sortTab}
              sortOptions={sortOptions}
            />
          </div>
        )}
      </div>
      <div className="activity-card">
        {topFiveItems.length ? (
          topFiveItems.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))
        ) : (
          <div className="text-appGray-100 text-sm activity-card-row">{`No ${name}s found`}</div>
        )}
      </div>
    </div>
  );
};
