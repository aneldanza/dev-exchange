import moment from "moment";
import Button from "../common/Button";
import { FullUserData } from "./types";
import { PencilIcon, CakeIcon } from "@heroicons/react/20/solid";

interface UserProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: FullUserData | any;
}

import React, { useState } from "react";
import { ActivityTab } from "./ActivityTab";

export const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { username, created_at, tags } = data;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid">
        <div className="justify-items-end grid">
          <Button
            title="Edit Profile"
            onClick={() => {}}
            className="btn-outline"
            icon={<PencilIcon className="w-4" />}
          />
        </div>
        <div>
          <div className="text-2xl font-semibold">{username}</div>
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
      </div>
      {activeTab === "Profile" && <div>Profile content</div>}
      {activeTab === "Activity" && <ActivityTab tags={tags} />}
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};
