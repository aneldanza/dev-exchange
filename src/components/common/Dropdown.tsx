import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

interface DropdownProps {
  options: string[];
  selectedOption: string;
  handleOptionSelect: (option: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  handleOptionSelect,
}) => {
  return (
    <div className="relative w-full">
      <select
        value={selectedOption!}
        onChange={(e) => handleOptionSelect(e.target.value)}
        className="w-full card pr-10 appearance-none p-2" // Hide the default arrow
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronUpDownIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Dropdown;
