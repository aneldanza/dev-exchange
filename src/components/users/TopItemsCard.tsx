import React, { useMemo } from "react";
import { capitalize } from "../../services/utils";

interface TopTagsProps<T> {
  sortedItems: T[];
  renderItem: (item: T) => React.ReactNode;
  name: string;
}

export const TopItemsCard = <T,>({
  sortedItems,
  renderItem,
  name,
}: TopTagsProps<T>) => {
  const topFiveItems = useMemo(() => sortedItems.slice(0, 5), [sortedItems]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg">{`Top ${capitalize(name)}s`}</div>
        {sortedItems.length > topFiveItems.length && (
          <div className="text-xs text-appGray-100">{`View all ${name}s`}</div>
        )}
      </div>
      <div className="activity-card">
        {topFiveItems.length ? (
          topFiveItems.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))
        ) : (
          <div>{`No ${name}s found`}</div>
        )}
      </div>
    </div>
  );
};
