import { Dropdown } from "flowbite-react";
import { capitalize } from "../../services/utils";

interface CustomDropdownProps {
  options: string[];
  handleOptionSelect: (option: string) => void;
  selectedOption: string;
}

const dropdownTheme = {
  inlineWrapper:
    "border border-appGray-400 hover:border-blue-500 flex items-center justify-between px-2 py-1 rounded cursor-pointer min-w-32 w-full",
};

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  handleOptionSelect,
  selectedOption,
}) => {
  return (
    <Dropdown
      label={capitalize(selectedOption)}
      inline
      color="info"
      theme={dropdownTheme}
    >
      {options.map((option) => (
        <Dropdown.Item key={option} onClick={() => handleOptionSelect(option)}>
          {capitalize(option)}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
