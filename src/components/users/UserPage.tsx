import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShowFullUserInfoQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { UserProfile } from "./UserProfile";
import { UserContext } from "./UserContext";
import { options, activityTabs } from "./activity/constants";
import UserProfileSkeleton from "./UserProfileSkeleton";
import { ActivityTab } from "./activity/ActivityTab";
import { ProfileTab } from "./profile/ProfileTab";
import { SettingsTab } from "./settings/SettingsTab";
import ActivityTabSkeleton from "./activity/ActivityTabSkeleton";
import ProfileTabSkeleton from "./profile/ProfileTabSkeleton";
import SettingsTabSkeleton from "./settings/SettingsTabSkeleton";

// First, wrap UserProfile with withError, then pass the resulting component to withLoading
const UserProfileWithErrorAndLoading = withLoading(
  withError(UserProfile, CustomError),
  UserProfileSkeleton
);

const ActivityTabWithErrorAndLoading = withLoading(
  withError(ActivityTab, CustomError),
  ActivityTabSkeleton
);

const ProfileTabWithErrorAndLoading = withLoading(
  withError(ProfileTab, CustomError),
  ProfileTabSkeleton
);

const SettingsTabWithErrorAndLoading = withLoading(
  withError(SettingsTab, CustomError),
  SettingsTabSkeleton
);

export const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, error, isLoading } = useShowFullUserInfoQuery(userId || "", {
    refetchOnMountOrArgChange: true,
  });

  const [activeTab, setActiveTab] = useState(activityTabs[0]);

  useEffect(() => {
    console.log(activeTab);
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

  return (
    <UserContext.Provider
      value={{ fullUserData: data, activeTab, setActiveTab }}
    >
      <UserProfileWithErrorAndLoading error={error} isLoading={isLoading} />
      <div className="mt-6">
        {activeTab === "profile" && (
          <ProfileTabWithErrorAndLoading error={error} isLoading={isLoading} />
        )}
        {activityTabs.includes(activeTab) && (
          <ActivityTabWithErrorAndLoading error={error} isLoading={isLoading} />
        )}
        {activeTab === "settings" && (
          <SettingsTabWithErrorAndLoading error={error} isLoading={isLoading} />
        )}
      </div>
    </UserContext.Provider>
  );
};

export default UserPage;
