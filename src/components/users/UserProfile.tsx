import moment from "moment";
import Button from "../common/Button";
import { FullUserData } from "./types";
import { PencilIcon } from "@heroicons/react/20/solid";

interface UserProfileProps {
  data: FullUserData;
}

import React, { useState } from "react";

export const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Profile");

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
          <div className="text-2xl font-semibold">{data.username}</div>
          <div className="text-xs">{`Member for ${moment(
            data.createdAt
          ).fromNow()}`}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={`cursor-pointer ${
            activeTab === "Profile" ? "font-semibold" : ""
          }`}
          onClick={() => handleTabClick("Profile")}
        >
          Profile
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Activity" ? "font-semibold" : ""
          }`}
          onClick={() => handleTabClick("Activity")}
        >
          Activity
        </div>
      </div>
      {activeTab === "Profile" && <div>Profile content</div>}
      {activeTab === "Activity" && <div>Activity content</div>}
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};
