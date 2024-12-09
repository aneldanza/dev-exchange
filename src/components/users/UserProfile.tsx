import moment from "moment";
import React, { useContext } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { Button } from "../common/Button";
import { ActivityTab } from "./activity/ActivityTab";
import { ProfileTab } from "./profile/ProfileTab";
import { FullUserData } from "./types";
import { CakeIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../services/storeHooks";
import { SettingsTab } from "./settings/SettingsTab";
import { UserContext } from "./UserContext";
import { activityTabs } from "./activity/constants";

export const UserProfile: React.FC = () => {
  const data = useContext(UserContext);
  const { username, created_at, id } = data.fullUserData as FullUserData;
  const { activeTab, setActiveTab } = data;
  const { user } = useAuth();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState({}, "", `?tab=${tab}`);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid">
        {user?.id === id && (
          <div className="justify-items-end grid">
            <Button
              title="Edit Profile"
              onClick={() => handleTabClick("settings")}
              className="btn btn-outline"
              icon={<PencilIcon className="w-4" />}
            />
          </div>
        )}
        <div>
          <div className="text-2xl font-semibold mb-4">{username}</div>
          <div className="flex gap-1 text-appGray-100">
            <CakeIcon className="w-4 self-center" />
            <div className="text-xs">{`Member for ${moment(created_at).fromNow(
              true
            )}.`}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div
          className={`tab ${
            activeTab === "profile" ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </div>
        <div
          className={`tab ${
            activityTabs.includes(activeTab) ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick("summary")}
        >
          Activity
        </div>
        {user?.id === id && (
          <div
            className={`tab ${
              activeTab === "settings" ? "active-tab" : "inactive-tab"
            }`}
            onClick={() => handleTabClick("settings")}
          >
            Settings
          </div>
        )}
      </div>
      {activeTab === "profile" && <ProfileTab setActiveTab={setActiveTab} />}
      {activityTabs.includes(activeTab) && <ActivityTab />}
      {activeTab === "settings" && (
        <SettingsTab data={data.fullUserData as FullUserData} />
      )}
    </div>
  );
};
