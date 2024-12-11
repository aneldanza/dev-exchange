/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select, { components, SingleValue, ActionMeta } from "react-select";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useGetAllQuestionsQuery } from "../../services/api";
import { LimitedQuestionData } from "../questions/types";
import { useNavigate } from "react-router-dom";

const customStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (base: any) => ({
    ...base,
    flexDirection: "row-reverse",
    minWidth: "300px",
    border: "1px solid black",
    borderRadius: "60px",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearIndicator: (base: any) => ({
    ...base,
    position: "absolute",
    right: 0,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueContainer: (base: any) => ({
    ...base,
    paddingRight: "2.3rem",
  }),
};

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <MagnifyingGlassIcon className="w-4 text-black" />
      </components.DropdownIndicator>
    )
  );
};

const OptionLabel = (option: LimitedQuestionData) => {
  return (
    <div className="flex">
      <div className="grow overflow-ellipsis whitespace-nowrap overflow-hidden">
        {option.title}
      </div>
    </div>
  );
};

export const SearchBar: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetAllQuestionsQuery(undefined);
  const navigate = useNavigate();

  const handleOptionChange = (
    newValue: SingleValue<LimitedQuestionData>,
    actionMeta: ActionMeta<LimitedQuestionData>
  ) => {
    console.log(actionMeta);
    newValue && navigate(`/questions/${newValue.id}`);
  };

  return (
    <Select
      options={isSuccess ? data : []}
      isClearable={true}
      isSearchable={true}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
      placeholder="Search for posts"
      styles={customStyles}
      formatOptionLabel={OptionLabel}
      isLoading={isLoading}
      onChange={handleOptionChange}
    />
  );
};
