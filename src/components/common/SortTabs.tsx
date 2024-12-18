import { FC } from "react";

interface SortTabsProps {
  sortOptions: string[];
  setSelectedOption: (option: string) => void;
  selectedOption: string;
}

export const SortTabs: FC<SortTabsProps> = ({
  sortOptions,
  setSelectedOption,
  selectedOption,
}) => {
  return (
    <div className="border rounded-md p-1 border-appGray-300">
      {sortOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelectedOption(option)}
          className={`${
            selectedOption === option
              ? " bg-appGray-50 rounded-sm text-appGay-500 font-medium p-1"
              : "text-appGray-300 p-1"
          } px-2 py-1`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
