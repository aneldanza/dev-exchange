import moment from "moment";
import React, { useState, useContext, useEffect } from "react";
import { ActivityTab } from "./activity/ActivityTab";
import { ProfileTab } from "./profile/ProfileTab";
import { FullUserData } from "./types";
import { CakeIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../services/storeHooks";
import { SettingsTab } from "./settings/SettingsTab";
import { UserContext } from "./UserContext";

const options = ["profile", "activity", "settings"];

export const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const data = useContext(UserContext);
  const { username, created_at, id } = data.fullUserData as FullUserData;
  const { user } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get("tab") || "";
      if (options.includes(tab)) {
        setActiveTab(tab);
      }
    };

    window.addEventListener("popstate", handlePopState);

    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab") || "";
    if (!tab) {
      window.history.pushState({}, "", `?tab=${activeTab}`);
    }

    if (options.includes(tab)) {
      setActiveTab(tab);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState({}, "", `?tab=${tab}`);
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
            activeTab === "profile" ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </div>
        <div
          className={`tab ${
            activeTab === "activity" ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick("activity")}
        >
          Activity
        </div>
        {user?.id === id && (
          <div
            className={`tab ${
              activeTab === "wettings" ? "active-tab" : "inactive-tab"
            }`}
            onClick={() => handleTabClick("settings")}
          >
            Settings
          </div>
        )}
      </div>
      {activeTab === "profile" && <ProfileTab setActiveTab={setActiveTab} />}
      {activeTab === "activity" && <ActivityTab />}
      {activeTab === "settings" && (
        <SettingsTab data={data.fullUserData as FullUserData} />
      )}
    </div>
  );
};
