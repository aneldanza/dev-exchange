import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullUserData } from "../types";
import { CustomDropdown } from "../../common/CustomDropdown";
import { Button } from "../../common/Button";
import { useDeleteAccountMutation } from "../../../services/api";
import { useAuth } from "../../../services/storeHooks";
import EditSettings from "./EditSettings";

interface SettingsTabProps {
  data: FullUserData;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ data }) => {
  const options = ["Edit", "Delete"];

  const [deleteAccount] = useDeleteAccountMutation();
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteAccount(data.id).unwrap();
      console.log(result);
      setUser(null);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      if (e.status === 401) {
        console.log(e.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 ">
      <div className="flex shrink-0 w-full md:hidden">
        <CustomDropdown
          options={options}
          handleOptionSelect={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
      <div className="md:w-1/4 md:max-w-40 min-w-auto hidden md:block">
        <ul className="list space-y-2 text-sm">
          {options.map((option) => (
            <li
              key={option}
              className={`tab ${
                selectedOption === option ? "active-tab" : "inactive-tab"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <>
          <div className="text-xl font-bold border-b border-b-appGray-50 mb-6 pb-6">
            {`${selectedOption} Profile`}
          </div>
          {selectedOption === "Edit" && <EditSettings data={data} />}
          {selectedOption === "Delete" && (
            <div className="w-full">
              <Button
                className="btn btn-primary bg-red-500 hover:bg-red-700"
                title="Delete profile"
                onClick={handleDeleteAccount}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};
