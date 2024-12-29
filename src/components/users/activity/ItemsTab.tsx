import { useEffect, useState } from "react";
import { formatCountString, sortItems } from "../../../services/utils";
import { SortTabs } from "../../common/SortTabs";

interface ItemsTabProps<T> {
  sortOptions: string[];
  label: string;
  items: T[];
  renderItem: (props: { items: T[] }) => React.ReactNode;
}

export const ItemsTab = <T,>({
  sortOptions,
  renderItem,
  label,
  items,
}: ItemsTabProps<T>) => {
  const [sortTab, setSortTab] = useState<string>(sortOptions[0]);
  const [sortedItems, setSortedItems] = useState<T[]>(items);

  useEffect(() => {
    const sorted = sortItems(items, sortTab);
    setSortedItems(sorted);
  }, [sortTab, items]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg">
          {formatCountString(items.length, label, `${label}s`)}
        </div>
        <div className="text-xs">
          <SortTabs
            setSelectedOption={setSortTab}
            selectedOption={sortTab}
            sortOptions={sortOptions}
          />
        </div>
      </div>
      {renderItem({ items: sortedItems })}
    </div>
  );
};
