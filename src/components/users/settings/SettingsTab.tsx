import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomDropdown } from "../../common/CustomDropdown";
import { Button } from "../../common/Button";
import { useDeleteAccountMutation } from "../../../services/api";
import { useAuth } from "../../../services/storeHooks";
import { UserContext } from "../UserContext";
import EditSettings from "./EditSettings";
import Flash from "../../common/Flash";

export const SettingsTab = () => {
  const options = ["Edit", "Delete"];

  const [deleteAccount] = useDeleteAccountMutation();
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const { clearUser, user } = useAuth();
  const { setActiveTab, fullUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string[]>([]);

  useEffect(() => {
    if (fullUserData?.id !== user?.id) {
      setActiveTab("summary");
      window.history.pushState({}, "", `?tab=summary`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteAccount = async () => {
    try {
      if (!fullUserData) return;
      await deleteAccount(fullUserData.id).unwrap();

      clearUser();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setFormError([...e.data.errors]);
        } else {
          setFormError([e.data.error]);
        }
      } else {
        setFormError(["An error occurred. Please try again later."]);
      }
      if (e.status === 401) {
        clearUser();
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
          {selectedOption === "Edit" && fullUserData && (
            <EditSettings data={fullUserData} />
          )}
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
      <Flash
        style="failure"
        display={!!formError.length}
        resetDisplay={() => setFormError([])}
      >
        <ul className="list-item">
          {formError.map((error, index) => (
            <li key={index}>{`${error}`}</li>
          ))}
        </ul>
      </Flash>
    </div>
  );
};
