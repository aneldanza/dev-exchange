import moment from "moment";
import React, { useState } from "react";
import { ActivityTab } from "./ActivityTab";
import { ProfileTab } from "./ProfileTab";
import { FullUserData } from "./types";
import { CakeIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../services/storeHooks";
import { SettingsTab } from "./SettingsTab";

interface UserProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: FullUserData | any;
}

export const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Activity");
  const { username, created_at, tags, id } = data;
  const { user } = useAuth();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid">
        {/* <div className="justify-items-end grid">
          <Button
            title="Edit Profile"
            onClick={() => {}}
            className="btn-outline"
            icon={<PencilIcon className="w-4" />}
          />
        </div> */}
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
            activeTab === "Profile" ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick("Profile")}
        >
          Profile
        </div>
        <div
          className={`tab ${
            activeTab === "Activity" ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick("Activity")}
        >
          Activity
        </div>
        {user?.id === id && (
          <div
            className={`tab ${
              activeTab === "Settings" ? "active-tab" : "inactive-tab"
            }`}
            onClick={() => handleTabClick("Settings")}
          >
            Settings
          </div>
        )}
      </div>
      {activeTab === "Profile" && <ProfileTab data={data} />}
      {activeTab === "Activity" && <ActivityTab tags={tags} />}
      {activeTab === "Settings" && <SettingsTab data={data} />}
    </div>
  );
};
