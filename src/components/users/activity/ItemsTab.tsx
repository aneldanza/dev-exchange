import { useEffect, useState } from "react";
import { formatCountString } from "../../../services/utils";
import { SortTabs } from "../../common/SortTabs";
import { PostData, PostsByTag } from "../types";

interface ItemsTabProps<T> {
  sortOptions: string[];
  label: string;
  items: T[];
  renderItem: (props: { items: T[] }) => React.ReactNode;
}

type Item = {
  created_at: string;
};

const sortByNewest = (a: Item, b: Item) => {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

const sortByOldest = (a: Item, b: Item) => {
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
};

export const ItemsTab = <T,>({
  sortOptions,
  renderItem,
  label,
  items,
}: ItemsTabProps<T>) => {
  const [sortTab, setSortTab] = useState<string>(sortOptions[0]);
  const [sortedItems, setSortedItems] = useState<T[]>(items);

  useEffect(() => {
    const sorted = [...items].sort((a, b) => {
      if (sortTab === "Newest") {
        // sort PostData[] by created_at
        return sortByNewest(a as Item, b as Item);
      }
      if (sortTab === "Oldest") {
        return sortByOldest(a as Item, b as Item);
      }
      if (sortTab === "Score") {
        // sort PostData[] by votes
        return (b as PostData).votes - (a as PostData).votes;
      }
      if (sortTab === "Name") {
        // sort PostsByTag[] by tag name
        return (a as PostsByTag).tag.name.localeCompare(
          (b as PostsByTag).tag.name
        );
      }
      if (sortTab === "Count") {
        // sort PostsByTag[] by number of posts
        return (b as PostsByTag).posts.length - (a as PostsByTag).posts.length;
      }
      return 0;
    });
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
